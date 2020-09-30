<template>
  <div>
    <dialog-save-data
      @close="dialog = false"
      @decline="onDecline"
      @save="onSave"
      :content="dialogContent"
      v-model="dialog"
      :loading="saving"
    />
    <chart-group :charts="charts" />
  </div>
</template>
<script>
import { mapState } from 'vuex'

import ChartGroup from '@/components/ChartGroup'
import DialogSaveData from '@/components/dialogs/DialogSaveData'
import databaseService from '@/services/databaseService'

export default {
  components: {
    DialogSaveData,
    ChartGroup
  },
  data: () => ({
    measureMode: false,
    measurements: [],
    dialogContent: {},
    saving: false,
    timer: null,
    dialog: false,
    charts: [
      {
        title: 'Signal level, dBm',
        refName: 'slvl',
        color: '#82B1FF',
        scale: [-120, 0],
        data: []
      },
      {
        title: 'Bit Error Rate',
        refName: 'ber',
        color: '#82B1FF',
        scale: [0, 100],
        data: []
      }
    ]
  }),
  computed: {
    ...mapState({
      measureModeState: state => state.modem.measureModeState,
    }),
  },
  watch: {
    measureModeState: {
      immediate: true,
      handler (value) {
        switch (value) {
          case 'started': {
            this.onMeasureStart()
            break
          }
          case 'paused': {
            this.onMeasurePause()
            break
          }
          case 'stopped': {
            this.onMeasureStop()
            break
          }
        }
      }
    }
  },
  methods: {
    onDecline () {
      this.measurements = []
      this.dialog = false
    },
    async onSave(filename) {
      this.saving = true;
      try {
        const dataId = (await databaseService.createDocument('MeasureData', {data: this.measurements})).data._id
        await databaseService.createDocument('MeasureFile', {
          name: filename,
          dataType: 'signal',
          dataId,
        })
        this.measurements = []
        this.$success('Data is succesfully saved in a database')
      } catch (error) {
        this.$error(error)
      }
      this.saving = false;
      this.dialog = false
    },
    onMeasureStart () {
      this.timer = setInterval(async () => {
        try {
          const measureData = await this.$store.dispatch('getMeasureData', this.$socket)
          this.charts[0].data.push({
            x: measureData.time,
            y: measureData.s_lvl
          })
          this.charts[1].data.push({
            x: measureData.time,
            y: measureData.ber
          })
          this.measurements.push({
            type: 'Feature',
            geometry: {
              type: 'Point',
            },
            properties: {
              ...measureData,
            }
          })
        } catch (error) {
          this.$error(error)
        }
      }, 1000);
    },
    onMeasurePause () {
      clearInterval(this.timer)
    },
    onMeasureStop () {
      clearInterval(this.timer)
      const dataLength = this.measurements.length
      if (dataLength) {
        this.dialog = true
         this.dialogContent = {
          title: 'Action confirmation',
          text: `You measured ${dataLength} ${dataLength > 1 ? 'points' : 'point'}. Do you want to save measured data?`,
          acceptText: 'Yes',
          declineText: 'No',
          cancelText: 'Cancel'
        }
      }
    }
  },
  sockets: {
    modem_info: function (data) {
      if (this.measureModeState !== 'started') {
        this.charts[0].data.push({
          x: data.timestamp,
          y: data.sq.s_lvl
        })
        this.charts[1].data.push({
          x: data.timestamp,
          y: data.sq.ber
        })
      }
    }
  },
}
</script>

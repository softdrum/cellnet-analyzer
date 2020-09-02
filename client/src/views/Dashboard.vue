<template>
  <v-row>
    <v-col
      :cols="12"
      :lg="6"
      :md="6"
      :sm="12"
    >
      <chart-card :title="'Signal level'">
        <realtime-chart
          v-model="s_lvl"
          refName="slvl"
          color="#82B1FF"
        />
      </chart-card>
    </v-col>
    <v-col
      :cols="12"
      :lg="6"
      :md="6"
      :sm="12"
    >
      <chart-card :title="'Bit Error Rate'">
        <realtime-chart
          v-model="ber"
          refName="ber"
          color="#82B1FF"
        />
      </chart-card>
    </v-col>
    <v-col
      :cols="12"
      :md="6"
      :sm="12"
    >
      <info-card-expandable :info="bsInfo" />
    </v-col>
    <v-col
      :cols="12"
      :lg="3"
      :md="6"
      :sm="6"
    >
      <info-card-single v-model="diskSpaceCard"/>

    </v-col>
    <v-col
      :cols="12"
      :lg="3"
      :md="6"
      :sm="6"
    >
      <info-card-single v-model="cpuTemperatureCard"/>
    </v-col>
  </v-row>
</template>

<script>
import InfoCardSingle from '../components/cards/InfoCardSingle'
import ChartCard from '../components/cards/ChartCard'
import InfoCardExpandable from '../components/cards/InfoCardExpandable'
import defaultOptions from '../components/charts/options/default.chart'
import RealtimeChart from '../components/charts/RealtimeChart'
import { mapState, mapGetters } from 'vuex'
import themes from '@/styles/colors.js'

export default {
  name: 'Dashboard',
  components: {
    InfoCardSingle,
    ChartCard,
    RealtimeChart,
    InfoCardExpandable
  },
  computed: {
    ...mapState({
      signalLevel: state => state.modem.signalLevel,
      bitErrorRate: state => state.modem.bitErrorRate,
      cpuTemperature: state => state.telemetry.cpuTemperature
    }),
    ...mapGetters([
      'freeDiskSpace'
    ]),
    iconColor () {
      if (this.$vuetify.theme.dark) return themes.dark['primary']
      else return themes.light['accent']
    },
    diskSpaceCard () {
      return {
        title: 'Free space',
        value: `${this.freeDiskSpace}`,
        measure: 'GB',
        icon: {
          name: 'icon-drive',
          color: this.iconColor
        }
      }
    },
    cpuTemperatureCard () {
      const temp = Math.round(this.cpuTemperature)
      return {
        title: 'CPU temp.',
        value: `${temp}`,
        measure: '°C',
        icon: {
          name: 'icon-thermometer',
          color: '#FF3E01'
        }
      }
    }
  },
  sockets: {
    connect() {
      console.log('socket connected')
    },
    signal_quality (data) {
      this.s_lvl = {
        x: data.time,
        y: data.s_lvl
      }
      this.ber = {
        x: data.time,
        y: data.ber
      }
    },
    basestation (info) {
      this.bsInfo = info
    },
  },
  methods: {
    resetData(){
      let slvlDataLength = this.signalLevelData.length
      let berDataLength = this.bitErrorRateData.length
      this.signalLevelData = this.signalLevelData.slice(slvlDataLength - 10, slvlDataLength);
      this.bitErrorRateData = this.bitErrorRateData.slice(berDataLength - 10, berDataLength);
    }
  },
  mounted() {
    var me = this
    // every 60 seconds, we reset the data to prevent memory leaks
    setInterval(function () {
      me.resetData()
      me.$refs.signalLevelChart.updateSeries([{
        data: me.signalLevelData
      }], false, true)
      me.$refs.bitErrorRateChart.updateSeries([{
        data: me.bitErrorRateData
      }], false, true)
    }, 60000)
  },
  data: () => ({
    signalLevelData: [],
    bitErrorRateData: [],
    s_lvl: null,
    ber: null,
    bsInfo: {status: 'online', mcc: 250, mnc: '02', snr: 22, slvl: 54, cid: 3132332, lac: 312},
    diskSpace: {title: 'No data', icon: {name: 'icon-drive'}},
    cpuTemp: {title: 'No data', icon: {name: 'icon-thermometer',}},
    options: defaultOptions.getOptions(['#00d0ea']),
    options2: defaultOptions.getOptions(['#fba500']),
    series: [{
      name: 'slvl',
      type: 'line',
      data: [10, 20, 30, 40]
    }],
    series2: [{
      name: 'series-2',
      type: 'line',
      data: []
    }]
  }),
}
</script>
<style scoped>
  .ani {
    transition: all 0.3s ease;
  }
</style>

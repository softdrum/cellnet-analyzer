<template>
  <div style="height: 100vh; width: 100%;" class="elevation-0">
    <DialogSaveData
      @close="dialog = false"
      @decline="onDecline"
      @accept="onSave"
      :content="dialogContent"
      v-model="dialog"
    />
    <Map>
      <MapClusterLayer
      :sourceId="'measurements'"
      :sourceData="measurements"
      />
      <MapMeasureModeSwitchButton v-model="measureMode" :isStarted="measureModeStarted" @error="onMeasureError"/>
      <transition name="bounce" enter-active-class="delay bounce-enter-active">
        <MapMeasureModeControls
          v-model="measureModeStarted"
          v-if="measureMode"
          @measure="onMeasureMarkerPlaced"
          @stop="onStopMeasure"
          @undo="onUndo"
        />
      </transition>
      <transition name="bounce" enter-active-class="delay bounce-enter-active">
        <MapLayersControl v-show="!measureMode" :sources="sources" :hidden="measureMode"/>
      </transition>
      <MglMarker v-if="measureModeStarted && loading" :coordinates="measureMarkerPosition" color="blue">
        <div slot="marker" class="marker"></div>
      </MglMarker>
      <MglScaleControl position="bottom-right"/>
    </Map>
  </div>
</template>

<script>
import {
  MglMarker,
  MglScaleControl,
} from "vue-mapbox";
import Map from '@/components/map/BaseMap'
import {
  MapIcons,
  MapLayer,
  MapClusterLayer,
  MapHeatmapLayer,
  MapLayersControl,
  MapMeasureModeSwitchButton,
  MapMeasureModeControls,
  MapBoundsDragHandler,
} from '@/components/map/components'

import DialogSaveData from '@/components/dialogs/DialogSaveData'

export default {
  components: {
    Map,
    MapBoundsDragHandler,
    MapIcons,
    MapHeatmapLayer,
    MapClusterLayer,
    MapLayer,
    MapLayersControl,
    MapMeasureModeSwitchButton,
    MapMeasureModeControls,
    DialogSaveData,
    MglMarker,
    MglScaleControl
  },
  data: () => ({
    sources: [],
    dialog: false,
    dialogContent: {},
    mapCenterPosition: {lng: 30.3207309188291, lat: 59.922883996810725},
    measureMode: false,
    measureModeStarted: false,
    measureMarkerPosition: [0,0],
    measurements: [],
    loading: false,
  }),
  methods: {
    onMeasureError (error) {
      this.dialog = true
      this.dialogContent = {
        title: 'Attention',
        text: error,
        acceptText: 'Yes, but save data',
        declineText: 'Yes',
        cancelText: 'No'
      }
    },
    onStopMeasure () {
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
      } else {
        this.measureModeStarted = false
      }
    },
    onUndo() {
      if (this.measurements.length) this.measurements.pop()
        console.log(this.measurements)
    },
    async onSave() {
      try {
        const dataId = (await databaseService.createDocument('MeasureData', {data: this.measurements})).data._id
        await databaseService.createDocument('MeasureFile', {
          name: 'testFile',
          dataType: 'heatmap',
          dataId,
        })
        this.measurements = []
        this.measureModeStarted = false
        this.measureMode = false
        this.$success('Data is succesfully saved in a database')
      } catch (error) {
        this.$error(error)
      }
      this.dialog = false
    },
    onDecline () {
      this.measurements = []
      this.measureModeStarted = false
      this.measureMode = false
      this.dialog = false
    },
    async onMeasureMarkerPlaced (coordinates) {
      this.loading = true
      this.measureMarkerPosition = coordinates
      try {
        const measureData = await this.$store.dispatch('getMeasureData', this.$socket)
        console.log(measureData)
        this.measurements.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates
          },
          properties: {
            ...measureData,
            icon: 'gsm'
          }
        })
      } catch (error) {
        this.$error(error)
      }
      this.loading = false
    },
  },
};
</script>

<template>
  <div style="height: 100vh; width: 100%;" class="elevation-0">
    <DialogSaveData
      @close="dialog = false"
      @decline="onDecline"
      @accept="onSave"
      :content="dialogContent"
      v-model="dialog"
    />
    <base-map>
      <MapClusterLayer
      :sourceId="'measurements'"
      :sourceData="measurements"
      />
      <map-controls-container position="top-right" style="position: absolute">
        <map-measure-mode-switch-button v-model="measureMode" :isStarted="measureModeStarted" @error="onMeasureError"/>
        <transition name="bounce" enter-active-class="delay bounce-enter-active">
          <map-measure-mode-controls
            v-model="measureModeStarted"
            v-if="measureMode"
            @measure="onMeasureMarkerPlaced"
            @stop="onStopMeasure"
            @undo="onUndo"
          />
        </transition>
        <transition name="bounce" enter-active-class="delay bounce-enter-active">
          <map-layers-control v-show="!measureMode" :sources="sources" :hidden="measureMode"/>
        </transition>
        <map-control-button text="" icon="icon-cog" />
      </map-controls-container>
      <mgl-marker v-if="measureModeStarted && loading" :coordinates="measureMarkerPosition" color="blue">
        <div slot="marker" class="marker"></div>
      </mgl-marker>
      <mgl-scale-control position="bottom-right"/>
    </base-map>
  </div>
</template>

<script>
import {
  MglMarker,
  MglScaleControl,
} from "vue-mapbox";
import BaseMap from '@/components/map/BaseMap'
import {
  MapClusterLayer,
  MapLayersControl,
  MapMeasureModeSwitchButton,
  MapMeasureModeControls,
  MapControlsContainer,
  MapControlButton
} from '@/components/map/components'

import DialogSaveData from '@/components/dialogs/DialogSaveData'
import databaseService from '@/services/databaseService'

export default {
  components: {
    BaseMap,
    MapClusterLayer,
    MapLayersControl,
    MapMeasureModeSwitchButton,
    MapMeasureModeControls,
    DialogSaveData,
    MglMarker,
    MapControlsContainer,
    MglScaleControl,
    MapControlButton
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

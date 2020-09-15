<template>
  <div style="height: 100vh; width: 100%;" class="elevation-0">
    <dialog-save-data
      @close="dialog = false"
      @decline="onDecline"
      @save="onSave"
      :content="dialogContent"
      v-model="dialog"
    />
    <base-map>
      <map-cluster-layer
        :sourceId="'cellsSource'"
        :sourceData="visibleCells"
        @source-created="addNewSource"
      />
      <map-cluster-layer
        :sourceId="'measurements'"
        :sourceData="measurements"
      />
      <map-icons />
      <map-controls-container
        position="top-right"
        style="position: absolute"
      >
        <map-measure-mode-switch-button
          v-model="measureMode"
          :isStarted="measureModeStarted"
          @error="onMeasureError"
        />
        <transition
          name="bounce"
          enter-active-class="delay bounce-enter-active"
        >
          <map-measure-mode-controls
            v-model="measureModeStarted"
            v-if="measureMode"
            @measure="onMeasureMarkerPlaced"
            @stop="onStopMeasure"
            @undo="onUndo"
          />
        </transition>
        <map-center 
          v-show="!measureMode" 
          @clicked="scanBasestationsAround" 
          class="mb-3"
        >
          <map-control-button
            :loading="loading"
            text="scan cells"
          />
        </map-center>
        <transition
          name="bounce"
          enter-active-class="delay bounce-enter-active"
        >
          <map-layers-control
           v-show="!measureMode"
           :sources="sources"
           :hidden="measureMode"
          />
        </transition>
      </map-controls-container>
      <mgl-marker
        v-if="measureModeStarted && loading"
        :coordinates="measureMarkerPosition"
        color="blue"
      >
        <div
          slot="marker"
          class="marker">
        </div>
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
  MapControlButton,
  MapCenter,
  MapIcons
} from '@/components/map/components'

import DialogSaveData from '@/components/dialogs/DialogSaveData'
import databaseService from '@/services/databaseService'
import basestationService from '@/services/basestationService'

export default {
  components: {
    BaseMap,
    MapCenter,
    MapClusterLayer,
    MapLayersControl,
    MapMeasureModeSwitchButton,
    MapMeasureModeControls,
    DialogSaveData,
    MglMarker,
    MapIcons,
    MapControlsContainer,
    MglScaleControl,
    MapControlButton
  },
  data: () => ({
    mapCenterPosition: {lng: 30.3207309188291, lat: 59.922883996810725},
    sources: [],
    dialog: false,
    dialogContent: {},
    measureMode: false,
    measureModeStarted: false,
    measureMarkerPosition: [0,0],
    measurements: [],
    loading: false,
    visibleCells: [],
  }),
  methods: {
    addNewSource (source) {
      this.sources.push(source)
    },
    async scanBasestationsAround (coordinates) {
      this.loading = true
      const query = `?lng=${coordinates.lng}&lat=${coordinates.lat}&radius=1`
      try {
        this.visibleCells = (await basestationService.getBasestations(query)).data
      } catch (error) {
        console.log(error);
      }
      this.loading = false
    },
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
    async onSave(filename) {
      try {
        const dataId = (await databaseService.createDocument('MeasureData', {data: this.measurements})).data._id
        await databaseService.createDocument('MeasureFile', {
          name: filename,
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
            icon: 'sq'
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

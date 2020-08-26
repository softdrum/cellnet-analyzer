<template>
  <div style="height: 100vh; width: 100%;" class="elevation-0">
    <Map
    >
      <MapBoundsDragHandler @changed="onBoundsChanged" :radius="1"/>
      <MapHeatmapLayer
        :sourceId="'heatmapSource'"
        :sourceData="heatmapData"
        @source-created="addNewSource"
      />
       <MapClusterLayer
        :sourceId="'cellsSource'"
        :sourceData="visibleCells"
        @source-created="addNewSource"
      />
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
import basestationService from '@/services/basestationService'
import databaseService from '@/services/databaseService'

// import { mapState } from 'vuex'
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
    cellsSourceData: [],
    heatmapData: [],
    sources: [],
    basestations: [],
    dialog: false,
    dialogContent: {},
    mapCenterPosition: {lng: 30.3207309188291, lat: 59.922883996810725},
    measureMode: false,
    measureModeStarted: false,
    measureMarkerPosition: [0,0],
    measurements: [],
    visibleCells: [],
    loading: false,
    basestationsCached: false
  }),
  methods: {
    addNewSource (source) {
      this.sources.push(source)
    },
    async onBoundsChanged (newMapCenter) {
      if (this.basestationsCached) {
        const query = `?lng=${newMapCenter.lng}&lat=${newMapCenter.lat}&radius=1`
        try {
          this.visibleCells = (await basestationService.getBasestations(query)).data
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  async mounted () {
    const query = `?lng=${this.mapCenterPosition.lng}&lat=${this.mapCenterPosition.lat}&radius=1`
    try {
      const vis = (await basestationService.getBasestations(query)).data
      this.basestationsCached = true
      this.heatmapData = vis.slice(0, 200).map (elem => {
        elem.properties.test = Math.round(Math.random()*100)
        return elem
      })
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

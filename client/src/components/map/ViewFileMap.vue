<template>
  <div style="height: 100vh; width: 100%;" class="elevation-0">
    <base-map
    >
      <map-icons />
      <map-bounds-drag-handler
       v-if="!heatmap"
       :radius="1"
       @changed="onBoundsChanged"
      />
      <map-cluster-layer
        v-if="heatmap"
        :sourceId="'fileSource'"
        :sourceData="data"
        :heatmap="heatmap"
        @source-created="addNewSource"
      />
      <map-cluster-layer
        v-if="!heatmap"
        :sourceId="'cells'"
        :sourceData="visibleCells"
        @source-created="addNewSource"
      />
      <map-controls-container
       position="top-right"
       style="position: absolute">
        <map-layers-control :sources="sources"/>
      </map-controls-container>
      <mgl-scale-control position="bottom-right"/>
    </base-map>
  </div>
</template>

<script>
import {
  MglScaleControl,
} from "vue-mapbox";
import BaseMap from '@/components/map/BaseMap'
import {
  MapIcons,
  MapClusterLayer,
  MapControlsContainer,
  MapLayersControl,
  MapBoundsDragHandler
} from '@/components/map/components'

import basestationService from '@/services/basestationService'

export default {
  name: 'ViewFileMap',
  components: {
    BaseMap,
    MapIcons,
    MapControlsContainer,
    MapLayersControl,
    MapClusterLayer,
    MglScaleControl,
    MapBoundsDragHandler
  },
  props: {
    data: {
      type: Array,
      default: () => {return []}
    },
    heatmap: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    cellsSourceData: [],
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
  
  
    async onBoundsChanged (newMapCenter) {
      if (this.basestationsCached) {
        const query = `?lng=${newMapCenter.lng}&lat=${newMapCenter.lat}&radius=1`
        try {
          this.visibleCells = (await basestationService.getBasestations(query)).data
        } catch (error) {
          console.log(error);
        }
      } else {
        if (!this.loading) {
          this.loading = true
          try {
            const query = `?lng=${newMapCenter.lng}&lat=${newMapCenter.lat}&radius=1`
            this.visibleCells = (await basestationService.getBasestations(query)).data
            this.basestationsCached = true
            this.loading = false
          } catch (error) {
            console.log(error);
          }
        }
      }
    },
  },
};
</script>

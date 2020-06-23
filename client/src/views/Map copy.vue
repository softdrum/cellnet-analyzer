<template>
  <div style="height: 600px; width: 100%" class="elevation-0">
    <MglMap :accessToken="accessToken" :center="coordinates" :mapStyle="mapStyle" >
      <MglMarker :coordinates="coordinates" color="blue" >
        <div slot="marker"><div style="width: 5px; height: 50px;background: red"></div></div>
        <MglPopup style="height: 100px">
        <div style="color: black">
          <div>Hello, I'm popup!</div>
          <div>Hello, I'm popup!</div>
          <div>Hello, I'm popup!</div>
          <div>Hello, I'm popup!</div>
          <div>Hello, I'm popup!</div>
        </div>
      </MglPopup>
      </MglMarker>
      <MglGeojsonLayer
          :sourceId="'xueta'"
          :source="clustersSource"
          layerId="clustersLayer"
          :layer="clustersLayer"
        />
        <MglGeojsonLayer
          :sourceId="'xueta'"
          :source="clustersSource"
          layerId="clustersLayer2"
          :layer="clustersLayer2"
        />
        <MglGeojsonLayer
          :sourceId="'xueta'"
          :source="clustersSource"
          layerId="unclusteredLayer"
          :layer="unclusteredLayer"
        />
    </MglMap>
  </div>
</template>

<script>

import {
  MglMap,
  MglMarker,
  MglPopup,
  MglGeojsonLayer
} from "vue-mapbox";
import Mapbox from "mapbox-gl";
const geojson = {
        type: "FeatureCollection",
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [-1.5518674999999575,47.2451248]
            },
            properties: {
              'marker-color': '#3bb2d0',
              'marker-size': 'large',
              'marker-symbol': 'rocket'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [2.3412468999999874,48.8233099]
            },
            properties: {
              'marker-color': '#3bb2d0',
              'marker-size': 'large',
              'marker-symbol': 'rocket'
            }
          }
        ]
        
      }
export default {
  components: {
    MglMap,
    MglMarker,
    MglPopup,
    MglGeojsonLayer
  },
  data() {
    return {
      coordinates: [5.446910099999968,43.286126],
      accessToken: 'pk.eyJ1IjoiZHJld3plcmciLCJhIjoiY2thdHAyZHB6MHZtbjM3b2NpdmFhMzBjbiJ9.FitsZxcjiZzIx9_4VddY3g', // your access token. Needed if you using Mapbox maps
      mapStyle: 'mapbox://styles/mapbox/streets-v11',
      clustersSource: {
        type: Object,
        data: geojson, //"https://gist.githubusercontent.com/Duermael/fd62c5ef80eceaf3b1a71a0f15aec60f/raw/1c01a3a80273e8d1d7e8d70385a2d6616d203e0f/map.geojson"
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 40 // Radius of each cluster when clustering points (defaults to 50)
      },
      clustersLayer: {
        id: 'clustersLayer',
        type: "circle",
        paint: { "circle-color": 'rgba(130,25,200, 0.3)', "circle-radius": 18 },
        filter: ["has", "point_count"],
        source: 'xueta'
      },
      clustersLayer2: {
        "id": "cluster-count",
        "type": "symbol",
        "source": "xueta",
        "layout": {
            "text-field": "{point_count}",
            "text-font": [
                "DIN Offc Pro Medium",
                "Arial Unicode MS Bold"
            ],
            "text-size": 12
        }
      },
      unclusteredLayer: {
        "id": "unclustered-points",
        "type": "symbol",
        "source": "xueta",
        "filter": ["!has", "point_count"],
        "layout": {
            "icon-image":  "marker-15",
            'icon-size': 1.25
        }
      },
    };
  },

  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  }
};
</script>
<style scoped>
  .map {
    height: 500px
  }
</style>

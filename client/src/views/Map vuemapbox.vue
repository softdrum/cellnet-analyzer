<template>
  <div style="height: 600px; width: 100%" class="elevation-0">
    <MglMap :accessToken="accessToken" :center="coordinates" :mapStyle="mapStyle" @load="onMapLoaded">
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
        :sourceId="'bsData'"
        :source="bsDataSource"
        layerId="clustersLayer"
        :layer="clustersLayer"
      />
      <MglGeojsonLayer
        :sourceId="'bsData'"
        :source="bsDataSource"
        layerId="unclusteredLayer"
        :layer="unclusteredLayer"
      />
    </MglMap>
  </div>
</template>

<script>
import gsm from '../assets/gsm.png'
import umts from '../assets/umts.png'
import lte from '../assets/lte.png'
const map_icons = [
  {
    id: 'gsm',
    url: gsm
  },
  {
    id: 'umts',
    url: umts
  },
  {
    id: 'lte',
    url: lte
  }
]
import {
  MglMap,
  MglMarker,
  MglPopup,
  MglGeojsonLayer
} from "vue-mapbox";
import Mapbox from "mapbox-gl";

export default {
  components: {
    MglMap,
    MglMarker,
    MglPopup,
    MglGeojsonLayer
  },
  data() {
    return {
      mmm: null,
      bsData: {type: 'FeatureCollection', features: []},
      coordinates: [30.3528464357712, 59.91534534594871],
      mapCenterPosition: {lng: 30.3207309188291, lat: 59.922883996810725},
      accessToken: 'pk.eyJ1IjoiZHJld3plcmciLCJhIjoiY2thdHAyZHB6MHZtbjM3b2NpdmFhMzBjbiJ9.FitsZxcjiZzIx9_4VddY3g', // your access token. Needed if you using Mapbox maps
      mapStyle: 'mapbox://styles/drewzerg/ckbwf6ak2128w1imx72cyxk7v',
      bsDataSource: {
        type: 'geojson',
        data: "https://gist.githubusercontent.com/Duermael/fd62c5ef80eceaf3b1a71a0f15aec60f/raw/1c01a3a80273e8d1d7e8d70385a2d6616d203e0f/map.geojson",
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 40 // Radius of each cluster when clustering points (defaults to 50)
      },
      clustersLayer: {
        id: 'clustersLayer',
        type: "circle",
        paint: { "circle-color": 'rgba(130,25,200, 0.3)', "circle-radius": 18 },
        filter: ["has", "point_count"],
      },
      unclusteredLayer: {
        "id": "unclusteredLayer",
        "type": "symbol",
        'filter': ['!', ['has', 'point_count']],
        "layout": {
            "icon-image":  "gsm",
        }
      },
    };
  },

  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
    this.map = null
  },
   watch: {
    async position (val) {
      console.log(val);
      if (this.getDistanceFromLatLonInKm(this.mapCenterPosition, val) >= 5) {
        this.mapCenterPosition = val
        this.bsData = await this.$store.dispatch('getGeoJSONSlice', {
          coordinates:this.mapCenterPosition,
          radius:1
        })
        console.log(this.bsData);
      }
    }
  },
  computed: {
    position() {
      if (this.map) return this.map.getCenter()
      return null
    }
  },
  async mounted () {
  },
  methods: {
    // ...mapActions(['setMap']),
    async onMapLoaded (e) {
      console.log(this.map);
      this.map = e.map
      this.mmm = Object.assign({}, this.map);
      await this.addImages(this.map, map_icons)
      // this.bsDataSource.data = await this.$store.dispatch('getGeoJSONSlice', {
      //     coordinates:this.mapCenterPosition,
      //     radius:1
      //   })
    },
    addImages(map, images) {
      const addImage = (map, id, url) => {
        return new Promise((resolve, reject) => {
          map.loadImage(url, (error, image) => {
            if(error) {
              reject(error);
              return;
            }
            map.addImage(id, image);
            resolve(image);
          });
        });
      }
      const promises = images.map( imageData => addImage(map, imageData.id, imageData.url) );
      return Promise.all(promises);
    },
    getDistanceFromLatLonInKm(oldLatLong, newLatLong) {
      var R = 6371; // Radius of the earth in km
      var dLat = this.deg2rad(newLatLong.lat-oldLatLong.lat);  // deg2rad below
      var dLon = this.deg2rad(newLatLong.lng-oldLatLong.lng); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(oldLatLong.lat)) * Math.cos(this.deg2rad(newLatLong.lat)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      return d;
    },
    deg2rad(deg) {
      return deg * (Math.PI/180)
    }
  }
};
</script>
<style scoped>
  .map {
    height: 500px
  }
</style>

<template>

  <div style="height: 500px; width: 100%">
    <div id="map" class="map"></div>
    <div style="height: 200px overflow: auto;">
      <p>First marker is placed at {{ withPopup.lat }}, {{ withPopup.lng }}</p>
      <p>Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }}</p>
      <button @click="showLongText">
        Toggle long popup
      </button>
      <button @click="showMap = !showMap">
        Toggle map
      </button>
    </div>
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      class="elevation-10"
      style="border-radius: 5px; height: 80%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
    <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <div
        v-for="(circle, id) in circles"
        :key="id"
      >
        <l-circle
            :lat-lng="circle.center"
            :radius="circle.radius"
          />
      </div>
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LCircle} from "vue2-leaflet";
import { L } from 'leaflet'
export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LCircle
  },
  data() {
    return {
      map: null,
      tileLayer: null,
      layers: [],
      // url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      url: 'C:/Users/Daniel/Downloads/2017-07-03_russia_saint-petersburg.mbtiles',
      circles: [
        {
          center: latLng(59.925783, 30.331176),
          radius: 10,
          weight: 10
        },
        {
          center: latLng(59.92591, 30.331052),
          radius: 10
        },
        {
          center: latLng(59.92599, 30.330684),
          radius: 10
        },
      ],
      zoom: 13,
      center: latLng(59.925377, 30.329817),
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(47.41322, -1.219482),
      withTooltip: latLng(47.41422, -1.250482),
      currentZoom: 5.5,
      currentCenter: latLng(47.41322, -1.219482),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true
    };
  },
  methods: {
    initLayers() {},
    initMap() {
      this.map = L.map('map').setView([38.63, -90.23], 12);
      this.tileLayer = L.tileLayer(
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
        }
      );
      this.tileLayer.addTo(this.map);
    },
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    }
  }
};
</script>

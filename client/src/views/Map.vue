<template>

  <div style="height: 500px; width: 100%">
    <div ref="map" class="map"></div>
  </div>
</template>

<script>
import 
// '../maps/SaintPetersburg.mbtiles'
import L from 'leaflet'
export default {
  name: "Example",
  components: {
  },
  data() {
    return {
      map: null,
      tileLayer: null,
      layers: [],
    };
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initLayers() {},
    initMap() {
      this.map = L.map(this.$refs.map).setView([59.925783, 30.331176], 20);
      // this.tileLayer = L.tileLayer(
      //   'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
      //   {
      //     maxZoom: 18,
      //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
      //   }
      // );
      this.tileLayer = L.tileLayer.mbTiles(' ', {
        minZoom: 0,
        maxZoom: 6
      });

      this.tileLayer.addTo(this.map);
    },
  }
};
</script>
<style scoped>
  .map {
    height: 500px
  }
</style>

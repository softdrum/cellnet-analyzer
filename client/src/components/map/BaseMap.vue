<template>
  <mgl-map
    :mapStyle="mapStyle"
    :zoom="10"
    :center="coordinates"
    class="base-map"
  >
    <slot />
  </mgl-map>
</template>

<script>
import {
  MglMap,
} from "vue-mapbox";

export default {
  data: () => ({
    tileServerURL: process.env.VUE_APP_TILE_SERVER_URL || 'http://localhost:8083',
    accessToken: 'pk.eyJ1IjoiZHJld3plcmciLCJhIjoiY2thdHAyZHB6MHZtbjM3b2NpdmFhMzBjbiJ9.FitsZxcjiZzIx9_4VddY3g',
    coordinates: [30.3207309188291, 59.922883996810725],
  }),
  components: {
    MglMap
  },
  computed: {
    mapStyle() {
      if (this.$vuetify.theme.dark) {
        return `${this.tileServerURL}/static/styles/dark/style.json`
      } else {
        return `${this.tileServerURL}/static/styles/bright/style.json`
      }
    }
  }
};
</script>

<style scoped>
  .base-map {
    height: 100vh;
    width: 100%;
  }
</style>

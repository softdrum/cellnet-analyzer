<template>
  <mgl-map
    :accessToken="accessToken"
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
// import style from './style.json'
export default {
  data: () => ({
    accessToken: 'pk.eyJ1IjoiZHJld3plcmciLCJhIjoiY2thdHAyZHB6MHZtbjM3b2NpdmFhMzBjbiJ9.FitsZxcjiZzIx9_4VddY3g',
    mapStyle: "http://localhost:8080/styles/klokantech-basic/style.json",
    coordinates: [30.3207309188291, 59.922883996810725],
  }),
  components: {
    MglMap
  }
};
</script>

<style scoped>
  .base-map {
    height: 100vh;
    width: 100%;
  }
</style>

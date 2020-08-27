<template>
  <MglMap
    :accessToken="accessToken"
    :mapStyle="mapStyle"
    :zoom="10"
    :center="coordinates"
    class="base-map"
  >
    <slot />
  </MglMap>
</template>

<script>
import {
  MglMap,
} from "vue-mapbox";

export default {
  data: () => ({
    accessToken: 'pk.eyJ1IjoiZHJld3plcmciLCJhIjoiY2thdHAyZHB6MHZtbjM3b2NpdmFhMzBjbiJ9.FitsZxcjiZzIx9_4VddY3g',
    mapStyle: 'mapbox://styles/drewzerg/ckbwf6ak2128w1imx72cyxk7v',
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

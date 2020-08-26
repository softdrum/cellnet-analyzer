<template>
  <v-btn class="map-control-button base">
    <div class="d-flex pa-3 justify-space-between align-center">
      {{ text }}
      <v-icon small>{{ icon }}</v-icon>
    </div>
  </v-btn>
</template>

<script>

export default {
  name: "MapControlButton",
  props: {
    text: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },
};
</script>

<style lang="scss">
  .map-controls-btn {
    min-width: 40px !important;
    width: 40px; 
    height: 40px;
  }
</style>

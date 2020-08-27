<template>
  <div>
    <v-card
      class="map-controls mb-3"
      @mouseenter="expand = true"
      @mouseleave="expand = false"
    >
      <div class="d-flex pa-3 justify-space-between align-center">
        <span v-if="expand">Layers</span>
        <div class="preview d-flex justify-center align-center">
          <v-icon class="control-icon">
            icon-layers
          </v-icon>
        </div>
      </div>
      <div
        v-if="expand"
        class="px-5"
      >
        <div v-for="(source, i) in sources" :key="i">
          <v-checkbox
            v-model="selected"
            :label="source.id"
            :value="source.id"
          />
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>

export default {
  name: "LayersControl",
  inject: ["mapbox", "map", "actions"],
  props: {
    sources: Array,
    hidden: Boolean
  },
  data: () => ({
    expand: false,
    selected: [],
    selectedCopy: []
  }),
  mounted () {
    this.selected = this.sources.map(source => source.id)
  },
  watch: {
    hidden (mapInMeasureMode) {
      if (mapInMeasureMode) {
        this.selectedCopy = this.selected.slice()
        this.selected = []
      } 
      else {
        this.selected = this.selectedCopy.slice()
        this.selectedCopy = []
      } 
    },
    selected () {
      this.sources.forEach(source => {
        const visibility = this.selected.includes(source.id) ? 'visible' : 'none'
        source.layers.forEach(layer => {
          this.map.setLayoutProperty(layer, 'visibility', visibility);
        })
      })
    }
  },
};
</script>
<style scoped>
  .preview {
    width: 40px;
    height: 40px;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
  }
  .map-controls {
    width: 40px;
    height: 40px;
    overflow: hidden;
    transition: all 0.2s ease;
  }
  .map-controls:hover {
    width: auto;
    height: 180px;
  }
</style>

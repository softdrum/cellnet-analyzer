<template>
  <base-map-control>
    <div class="map-controls">
      <transition name="bounce">
        <v-card  v-if="!value">
          <div class="pa-4 mb-4">  
            Settings
            <NetworkSelector />
          </div>
        </v-card>
      </transition>
      <transition name="fade" enter-active-class="delay fade-enter-active">
        <div class="d-flex justify-space-between" v-if="!value">
          <v-btn block @click="$emit('input', !value)" class="start-btn elevation-4"> Start</v-btn>
        </div>
      </transition>
      <transition name="fade" enter-active-class="delay fade-enter-active">
        <div class="d-flex justify-space-between" v-if="value">
            <v-btn class="control-btn" @click="$emit('undo')"> Undo </v-btn>
            <v-btn
              class="control-btn stop-btn elevation-4"
              @click="onStopBtnClicked">
              Stop
            </v-btn>
        </div>
      </transition>
    </div>
  </base-map-control>
</template>

<script>
import BaseMapControl from '@/components/map/BaseMapControl'
import NetworkSelector from '@/components/NetworkSelector'
export default {
  name: "MeasureModeControls",
  inject: ["mapbox", "map", "actions"],
  props: {
    mode: Boolean,
    value: Boolean
  },
  components: {
    BaseMapControl,
    NetworkSelector,
  },
  data: () => ({
    expand: false,
    selected: [],
    start: false,
  }),
   methods: {
    onStopBtnClicked () {
      this.$emit('stop')
    },
    changeMode () {
      this.$emit('changeMode')
    },
    async onClick (e) {
      const coordinates = [e.lngLat.lng, e.lngLat.lat]
      this.$emit('measure', coordinates)
    },
    startMeasurementSession () {
      this.map.on('click', this.onClick)
    },
  },
  computed: {
    width () {
      return window.innerWidth
    },
    btnTitle () {
      return this.start ? 'stop' : 'start'
    }
  },
  created () {
    this.map.off('click', this.onClick)
  },
  watch: {
    value (value) {
      this.$emit('input', value)
      if (value) this.startMeasurementSession()
      else this.map.off('click', this.onClick)
    },
  },
};
</script>
<style scoped>
  .control-btn {
    width: 48%;
  }
  .stop-btn {
    background: red !important;
  }
  .map-controls {
    width: 170px;
    height: auto;
    transition: all 0.2s ease;
  }
</style>

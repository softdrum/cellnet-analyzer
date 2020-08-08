<template>
  <div class="map-controls">
    <v-card class="d-flex align-center justify-space-around px-2">
      <h1 class="align-self-center body-2 ">Measure mode</h1>
      <div @click="onClick">
        <v-switch
          v-model="mode"
          @click.prevent=""
          :switch="!desktop"
          :inset="!desktop"
      />
      </div>
    </v-card>
  </div>
</template>

<script>

export default {
  name: "MeasureModeButton",
  props: {
    value: Boolean,
    isStarted: Boolean
  },
  data: () => ({
    expand: false,
    selected: [],
    mode: false
  }),
  watch: {
    value (val) {
      this.mode = val
    }
  },
  methods: {
    onClick () {
      if (this.isStarted && this.mode) {
        this.$emit('error', 'Are you sure you want to cancel this measure session?')
      }
      else {
        this.mode = !this.mode
        this.$emit('input', this.mode)
      }
    }
  },
  computed: {
    desktop () {
      return window.innerWidth > 700
    }
  },
};
</script>
<style scoped>
  .map-controls {
    position: absolute;
    right: 10px;
    width: 170px;
    overflow: hidden;
    top: 20px;
    transition: all 0.2s ease;
  }
</style>

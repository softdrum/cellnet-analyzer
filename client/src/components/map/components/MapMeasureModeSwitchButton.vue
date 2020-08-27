<template>
  <base-map-control>
    <div class="d-flex align-center justify-space-between px-3">
      <h1 class="align-self-center body-2 mr-3">Measure mode</h1>
      <div @click="onClick">
        <v-switch
          v-model="mode"
          @click.prevent=""
          :switch="!desktop"
          :inset="!desktop"
      />
      </div>
    </div>
  </base-map-control>
</template>

<script>
import BaseMapControl from '@/components/map/BaseMapControl'

export default {
  name: "MeasureModeSwitchButton",
  props: {
    value: Boolean,
    isStarted: Boolean
  },
  components: {
    BaseMapControl
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

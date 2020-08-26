<template>
  <div
    class="battery"
    :style="`border-color: ${borderColor}`"
  >
    <div
      class="battery-level"
      :style="{width: batteryLevel, background: batteryColor}"
    >
    </div>
  </div>
</template>

<script>
import themes from '@/styles/colors.js'
export default {
  name: 'TheBatteryLevelItem',
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    batteryLevel () {
      return this.value + '%'
    },
    batteryColor () {
      if (this.value < 15) return 'red'
      else if (this.value < 50) return 'orange'
      else if (this.value < 70) return 'yellow'
      else return 'green'
    },
    borderColor () {
      if (this.$vuetify.theme.dark) return themes.dark['text-secondary']
      else return themes.light['text-secondary']
    }
  },
}
</script>

<style lang="scss" scoped>
  .battery {
    border: 1px solid;
    width: 28px;
    height: 15px;
    padding: 2px;
    border-radius: 4px;
    position: relative;
    margin: 15px 0;
  }
  .battery-level {
    position: absolute;
    border-radius: 4px;
    height: 100%;
    bottom: 0px;
    left: 0;
    right: 0;
    transition: width 0.3s ease;
  }
  .battery:before {
    content: '';
    height: 10px;
    width: 2px;
    background: #404C5C;
    display: block;
    position: absolute;
    right: -2px;
    top: 1px;
    border-radius: 4px 4px 0 0;
  }
</style>

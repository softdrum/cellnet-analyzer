<template>
  <div
    class="battery"
    :style="`border-color: ${borderColor}`"
  >
    <div
      class="battery-level"
      :style="{width: batteryWidth, background: batteryColor}"
    >
    </div>
  </div>
</template>

<script>
import themes from '@/styles/colors.js'
import { mapGetters } from 'vuex'

export default {
  name: 'TheBatteryLevelItem',
  computed: {
    ...mapGetters([
      'batteryLevel'
    ]),
    batteryWidth () {
      return this.batteryLevel + '%'
    },
    batteryColor () {
      if (this.batteryLevel < 15) return 'red'
      else if (this.batteryLevel < 50) return 'orange'
      else if (this.batteryLevel < 70) return 'yellow'
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

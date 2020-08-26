<template>
  <nav>
    <v-app-bar
    class="mynav content"
    :class="{'px-2': desktop}"
    flat
    >
      <div
        class="d-flex align-center justify-space-between"
        style="width: 100%;"
      >
        <h1
          class="font-weight-light"
          style="font-size: 1.25rem;"
        >
          {{ pageName }}
        </h1>
        <v-spacer></v-spacer>
        <network-selector class="mr-3" />
        <battery-level-mini v-model="batteryLevel"/>
      </div>
    </v-app-bar>
    <v-divider></v-divider>
  </nav>
</template>
<script>
import BatteryLevelMini from '@/components/telemetry/BatteryLevelItemMini'
import NetworkSelector from '@/components/NetworkSelector'
export default {
  name: 'TheAppbar',
  props: {
    desktop: {
      type: Boolean,
      default: true
    }
  },
  components: {
    BatteryLevelMini,
    NetworkSelector
  },
  data: () => ({
    loading: false,
    batteryLevel: 20,
  }),
  computed: {
    pageName() {
      const path = this.$route.fullPath
      switch (path) {
        case '/database': return 'Database'
        case '/database/basestations': return 'Basestations'
        case '/database/signals': return 'Signals'
        case '/charts': return 'Charts'
        case '/map': return 'Map'
        default: return 'Main dashboard'
      }
    }
  },
}
</script>
<style lang="scss" scoped>
  .mynav {
    height: 64px !important;
    background: transparent !important;
  }
</style>

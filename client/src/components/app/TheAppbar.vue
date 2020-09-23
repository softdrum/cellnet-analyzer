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
        <div class="mx-4" v-if="pageName === 'Charts'">
          <v-btn
            v-if="measureModeState === 'stopped'"
            outlined
            small
            @click="setMeasureModeState('started')"
          >
            start record
          </v-btn>
          <div v-else>
            <v-btn icon small @click="setMeasureModeState('stopped')">
              <v-icon small>icon-stop2</v-icon>
            </v-btn>
            <v-btn icon small @click="setMeasureModeState('paused')" v-if="measureModeState === 'started'">
              <v-icon small>icon-pause2</v-icon>
            </v-btn>
            <v-btn icon small @click="setMeasureModeState('started')" v-else>
              <v-icon small>icon-play3</v-icon>
            </v-btn>
          </div>
        </div>
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
import { mapState, mapActions } from 'vuex'
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
    ...mapState({
      measureModeState: state => state.modem.measureModeState,
    }),
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
  methods: {
    ...mapActions(['setMeasureModeState'])
  }
}
</script>
<style lang="scss" scoped>
  .mynav {
    height: 64px !important;
    background: transparent !important;
  }
</style>

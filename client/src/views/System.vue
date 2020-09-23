<template>
  <div>
    <v-row>
      <v-col
        :cols="12"
        :lg="4"
        :md="6"
        :sm="6"
      >
        <v-card class="py-3" style="width: 100%" v-if="isMobile">
          <div class="d-flex align-center justify-space-between flex-row">
            <temperature-item v-model="cpuTemperature"/>
            <radial-chart v-model="cpuUsage" :title="'cpu'"/>
          </div>
        </v-card>
        <info-card :data="cpuInfoCard.data" :icon="cpuInfoCard.icon" v-else/>
      </v-col>
      <v-col
        :cols="12"
        :lg="4"
        :md="6"
        :sm="6"
      >
        <info-card :data="memoryInfoCard.data" :icon="memoryInfoCard.icon"/>
      </v-col>
      <v-col
        :cols="12"
        :lg="4"
        :md="6"
        :sm="6"
      >
        <battery-info-card :data="batteryInfo" />
      </v-col>
      <v-col
        :cols="12"
        :lg="4"
        :md="6"
        :sm="6"
      >
        <disk-space-info-card v-model="diskSpaceInfo"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import RadialChart from '@/components/charts/RadialChart'
import TemperatureItem from '@/components/telemetry/TemperatureItem'
import InfoCard from '@/components/cards/InfoCard'
import BatteryInfoCard from '@/components/cards/BatteryInfoCard'
import DiskSpaceInfoCard from '@/components/cards/DiskSpaceInfoCard'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    RadialChart,
    DiskSpaceInfoCard,
    TemperatureItem,
    InfoCard,
    BatteryInfoCard
  },
  computed: {
    ...mapState({
      cpuTemperature: state => state.telemetry.cpuTemperature,
      cpuUsage: state => state.telemetry.cpuUsage,
      memoryFree: state => state.telemetry.memoryFree,
      memoryUsage: state => state.telemetry.memoryUsage,
    }),
    ...mapGetters([
      'diskSpaceInfo',
      'batteryCapacity',
      'batteryVoltage'
    ]),
    cpuInfoCard () {
      return {
        data: [
          {
            title: 'CPU Temp',
            value: this.cpuTemperature,
            measure: '°C'
          },
          {
            title: 'Usage',
            value: this.cpuUsage,
            measure: '%'
          }
        ],
        icon: {
          name: 'icon-cpu',
          color: '#3F8BB5'
        }
      }
    },
    memoryInfoCard () {
      return {
        data: [
          {
            title: 'Free',
            value: this.memoryFree,
            measure: 'MB'
          },
          {
            title: 'Usage',
            value: this.memoryUsage,
            measure: '%'
          }
        ],
        icon: {
          name: 'icon-ram',
          color: '#3FB58B'
        }
      }
    },
    batteryInfo () {
      return [
        {
          title: 'Battery capacity',
          value: this.batteryCapacity,
          measure: '%'
        },
        {
          title: 'Voltage',
          value: this.batteryVoltage,
          measure: 'V'
        }
      ]
    },
    isMobile () {
      return this.$vuetify.breakpoint.width < 767
    },
  }
}
</script>
<style scoped>
  .inner-shadow {
    box-shadow: inset 0px 0px 10px rgba(0,0,0,0.3);
  }
</style>

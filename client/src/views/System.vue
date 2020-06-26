<template>
  <v-row>
    <!-- <v-col
      cols="12"
      xl="6"
      lg="6"
      md="6"
      sm="6"
      xs="12"
    >
      <v-card class="pr-2" style="border-radius: 10px">
        <div class="d-flex align-center justify-space-between">
          <Temperature :value="cpuTemp" />
          <RadialChart :title="'CPU Usage'" :value="cpuUsage"/>
        </div>
      </v-card>
    </v-col> -->
    <v-col
      cols="12"
      xl="4"
      lg="4"
      md="6"
      sm="6"
      xs="12"
    >
      <InfoCard :data="cpuInfo.data" :icon="cpuInfo.icon"/>
    </v-col>
     <v-col
      cols="12"
      xl="4"
      lg="4"
      md="6"
      sm="6"
      xs="12"
    >
      <InfoCard :data="memoryInfo.data" :icon="memoryInfo.icon"/>
    </v-col>
    <v-col
      cols="12"
      xl="6"
      lg="6"
      md="6"
      sm="6"
      xs="12"
    >
      <v-card class="py-7 px-12" style="border-radius: 10px">
        <div class="d-flex align-center justify-space-between">
          
          <div>
            <div class="font-weight-light" style="color: #404C5C; font-size: 1rem">Battery capacity</div>
            <div class="font-weight-light" style="font-size: 1.8rem">{{cpuTemp}}%</div>
            <div class="font-weight-light body-1" style="color: #404C5C;">Standalone</div>
            <div class="font-weight-light" style="font-size: 1.8rem">2 hours</div>
          </div>
          <Battery class="mr-5" :value="cpuTemp"/>
        </div>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      xl="6"
      lg="6"
      md="6"
      sm="6"
      xs="12"
    >
      <v-card class="py-7 px-12" style="height: 100%; border-radius: 10px">
        <div class="d-flex align-center justify-space-between" style="height: 100%">
          <v-icon style="font-size: 95px" color="#141926">mdi-harddisk</v-icon>
          <DiskSpaceChart :value="diskSpace"/>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
// import RadialChart from '@/components/charts/RadialChart'
import DiskSpaceChart from '@/components/charts/DiskSpaceChart'
// import Temperature from '@/components/charts/Temperature'
import Battery from '@/components/charts/Battery'
import InfoCard from '@/components/cards/InfoCard'

export default {
  components: {
  //  RadialChart,
    DiskSpaceChart,
  //  Temperature,
    Battery,
    InfoCard
  },
  data: () => ({
    cpuTemp: 0,
    memoryInfo: {
      icon: {
        name: 'mdi-cpu-32-bit',
        color: '',
      }
    },
    diskSpace: {},
    cpuInfo: {
      icon: {
        name: 'mdi-cpu-32-bit',
        color: '',
      }
    }
  }),
  mounted() {
    // this.change()
  },

  methods: {
  },
  sockets: {
    connect() {
        console.log('socket connected')
    },
    cpu_info: function (data) {
      this.cpuInfo = {
        data: [
          {
            title: 'CPU Temp',
            value: data.cpuTemp,
            measure: '°C'
          },
          {
            title: 'Usage',
            value: data.cpuUsage,
            measure: '%'
          }
        ],
        icon: {
          name: 'mdi-cpu-32-bit',
          color: '#3f8bb5'
        }
      }
    },
    disk_space: function (data) {
      this.diskSpace = data
    },
    freemem_percentage: function (data) {
      this.memoryInfo = {
        data: [
          {
            title: 'Free',
            value: data.freemem,
            measure: 'MB'
          },
          {
            title: 'Usage',
            value: data.freememPercent,
            measure: '%'
          }
        ],
        icon: {
          name: 'mdi-memory',
          color: '#3FB58B'
        }
      }
    }
    },
  }
</script>
<style scoped>
  .inner-shadow {
    box-shadow: inset 0px 0px 10px rgba(0,0,0,0.3);
  }
</style>

<template>
  <v-row>
    <v-col
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
            <div class="font-weight-light body-1" style="color: #404C5C;">Free</div>
            <div class="font-weight-light" style="font-size: 32px">{{ Math.round(freeMem) }} MB</div>
            <div class="font-weight-light body-1" style="color: #404C5C;">Usage</div>
            <div class="font-weight-light" style="font-size: 32px">{{ Math.round(freeMem) }} %</div>
          </div>
          <v-icon style="font-size: 110px" color="primary">mdi-harddisk</v-icon>
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
      <v-card class="py-7 px-12" style="border-radius: 10px">
        <div class="d-flex align-center justify-space-between">
          
          <div>
            <div class="font-weight-light body-1" style="color: #404C5C;">Battery capacity</div>
            <div class="font-weight-light" style="font-size: 32px">{{cpuTemp}}%</div>
            <div class="font-weight-light body-1" style="color: #404C5C;">Standalone</div>
            <div class="font-weight-light" style="font-size: 32px">2 hours</div>
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
import RadialChart from '@/components/charts/RadialChart'
import DiskSpaceChart from '@/components/charts/DiskSpaceChart'
import Temperature from '@/components/charts/Temperature'
import Battery from '@/components/charts/Battery'

export default {
 components: {
   RadialChart,
   DiskSpaceChart,
   Temperature,
   Battery,
 },
 data: () => ({
   cpuUsage: 0,
   cpuTemp: 0,
   freeMem: 0,
   diskSpace: {}
 }),
 mounted() {
   this.change()
 },
 methods: {
   change() {
     this.$socket.client.emit('changeMode', 'GSM');
   }
 },
 sockets: {
    connect() {
        console.log('socket connected')
    },
    cpu_usage: function (data) {
     this.cpuUsage = data
    },
    cpu_temp: function (data) {
     this.cpuTemp = Math.round(data)
    },
    disk_space: function (data) {
     this.diskSpace = data
    },
    freemem_percentage: function (data) {
     this.freeMem = 100 - data
    }
  },
}
</script>
<style scoped>
  .inner-shadow {
    box-shadow: inset 0px 0px 10px rgba(0,0,0,0.3);
  }
</style>

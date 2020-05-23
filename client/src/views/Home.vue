<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        xl="6"
        lg="6"
        md="6"
        sm="6"
        xs="12"
      >
          <!-- {{ $store.state.modem.signal_level }} -->
        <ChartCard :title="'Signal level'">
          <apexchart slot="chart" type="line" ref="chart1" :options="options" :series="series"></apexchart>
       </ChartCard>
      </v-col>
      <v-col
        v-if="windowWidth > 768"
        cols="12"
        xl="6"
        lg="6"
        md="6"
        sm="6"
        xs="12"
      >
        <ChartCard :title="'Bit Error Rate'">
          <apexchart slot="chart" ref="chart2" type="line" :options="options2" :series="series2"></apexchart>
       </ChartCard>
      </v-col>
      <v-col
        cols="12"
        xl="6"
        lg="6"
        md="6"
        sm="12"
        xs="12"
      >
        <InfoCard v-if="0 < 1" :info="bsInfo" />
        <InfoCardCollapsible v-else :info="bsInfo" />
      </v-col>
      <v-col
        cols="12"
        xl="3"
        lg="3"
        md="3"
        sm="6"
        xs="12"
      >
        <StatCard :stat="diskSpace"/>
      </v-col>
      <v-col
        cols="12"
        xl="3"
        lg="3"
        md="3"
        sm="6"
        xs="12"
      >
        <StatCard :stat="cpuTemp"/>
      </v-col>
      <v-col
        cols="12"
        xl="6"
        lg="6"
        md="6"
        sm="12"
        xs="12"
      >
        <InfoCard v-if="2 < 1" :info="bsInfo" />
        <InfoCardCollapsible v-else :info="bsInfo" />
      </v-col>
      <v-col
        cols="12"
        xl="3"
        lg="3"
        md="3"
        sm="6"
        xs="12"
      >
        <StatCard :stat="diskSpace"/>
      </v-col>
      <v-col
        cols="12"
        xl="3"
        lg="3"
        md="3"
        sm="6"
        xs="12"
      >
        <StatCard :stat="cpuTemp"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
let data1 = []
let data2 = []
function getNewSeries(s_lvl, ber) {
  data1.push({
    x: new Date().getTime(),
    y: s_lvl
  })
  data2.push({
    x: new Date().getTime(),
    y: ber
  })
  
}
function resetData(){
// Alternatively, you can also reset the data at certain intervals to prevent creating a huge series 
  data1 = data1.slice(data1.length - 10, data1.length);
  data2 = data2.slice(data2.length - 10, data2.length);
}
// @ is an alias to /src
import StatCard from '../components/cards/StatCard'
import ChartCard from '../components/cards/ChartCard'
import InfoCard from '../components/cards/InfoCard'
import InfoCardCollapsible from '../components/cards/InfoCardCollapsible'
import defaultOptions from '../components/charts/options/default.chart'
export default {
  name: 'Home',
  components: {
    StatCard,
    ChartCard,
    InfoCard,
    InfoCardCollapsible
  },
  sockets: {
    connect() {
        console.log('socket connected')
    },
    signal_quality: function (data) {
      var me = this
      getNewSeries(data.s_lvl, data.ber)
      me.$refs.chart1.updateSeries([{
        data: data1
      }])
      me.$refs.chart2.updateSeries([{
        data: data2
      }])
    },
    basestation (info) {
      this.bsInfo = info
    },
    disk_space: function (data) {
     this.diskSpace = {
       title: 'Free space',
       subtitle: `${(data.free / 1000**3).toFixed(1)} GB`,
      icon: {
        name: 'mdi-harddisk',
        color: '40B64C'
      }
     }
    },
    cpu_temp: function (data) {
     const temp = Math.round(data)
     this.cpuTemp = {
       title: 'CPU temp.',
       subtitle: `${temp}°C`,
      icon: {
        name: 'mdi-coolant-temperature',
        color: '40B64C'
      }
     }
    },
  },
  mounted() {
    var me = this
    // setInterval(function () {
    //  getNewSeries(Math.random()*100)
    //   me.$refs.chart1.updateSeries([{
    //     data: data
    //   }])
      // me.$refs.chart2.updateSeries([{
      //   data: data2
      // }])
    // }, 1000)
  
    // every 60 seconds, we reset the data to prevent memory leaks
    setInterval(function () {
      resetData()
      me.$refs.chart1.updateSeries([{
        data: me.data1
      }], false, true)
      me.$refs.chart2.updateSeries([{
        data: me.data2
      }], false, true)
    }, 60000)
  },
  data: () => ({
    s_lvl: '',
    bsInfo: {},
    diskSpace: {},
    cpuTemp: {},
    options: defaultOptions.getOptions(['#00d0ea']),
    options2: defaultOptions.getOptions(['#fba500']),
    windowWidth: window.innerWidth,
    stats: [
     
      {
        title: 'Bit Error Rate',
        subtitle: '25',
        icon: {
          name: 'mdi-chart-donut',
          color: 'yellow'
        }
      },
      {
        title: 'Operator',
        subtitle: 'Megafon',
        icon: {
          name: 'mdi-signal-variant',
          color: 'success'
        }
      },
      {
        title: 'Capacity',
        subtitle: '105GB',
        icon: {
          name: 'mdi-database',
          color: 'primary'
        },
      },
    ],
    series: [{
      name: 'series-1',
      type: 'line',
      data: data1.slice()
    }],
    series2: [{
      name: 'series-2',
      type: 'line',
      data: data2.slice()
    }]
  }),
}
</script>
<style scoped>
  .ani {
    transition: all 0.3s ease;
  }
</style>

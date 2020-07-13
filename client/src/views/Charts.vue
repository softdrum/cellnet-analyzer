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
          <!-- {{ $store.state.modem.signal_level }} -->
        <ChartCard :title="'Signal level'">
          <apexchart  height="250" slot="chart" type="line" ref="chart1" :options="options" :series="series"></apexchart>
       </ChartCard>
      </v-col>
      <v-col
        cols="12"
        xl="6"
        lg="6"
        md="6"
        sm="6"
        xs="12"
      >
        <ChartCard :title="'Bit Error Rate'">
          <apexchart height="250" slot="chart" ref="chart2" type="line" :options="options2" :series="series2"></apexchart>
       </ChartCard>
      </v-col>
      <v-col
        cols="12"
        xl="6"
        lg="6"
        md="6"
        sm="6"
        xs="12"
      >
        <ChartCard :title="'Bit Error Rate'">
          <apexchart height="250" slot="chart" ref="chart2" type="line" :options="options2" :series="series2"></apexchart>
       </ChartCard>
      </v-col>
      <v-col
        cols="12"
        xl="6"
        lg="6"
        md="6"
        sm="6"
        xs="12"
      >
        <ChartCard :title="'Bit Error Rate'">
          <apexchart height="250" slot="chart" ref="chart2" type="line" :options="options2" :series="series2"></apexchart>
       </ChartCard>
      </v-col>
  </v-row>
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
import ChartCard from '../components/cards/ChartCard'
import defaultOptions from '../components/charts/options/default.chart'

export default {
  components: {
    ChartCard
  },
  data: () => ({
    options: defaultOptions.getOptions(['#00d0ea']),
    options2: defaultOptions.getOptions(['#fba500']),
  }),
  mounted () {
    var me = this
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
    }
  },
}
</script>

<template>
  <v-row>
    <v-col lg="12">
      <ChartCard id="chart" :title="'Signal level, dBm'">
        <apexchart slot="chart" height="200" type="line" ref="chart1" :options="options" :series="series"></apexchart>
      </ChartCard>
    </v-col>
    <v-col lg="12">
      <ChartCard id="chart" :title="'Bit Error Rate, %'">
        <apexchart slot="chart" height="200" type="line" ref="chart2" :options="options2" :series="series2"></apexchart>
      </ChartCard>
    </v-col>
  </v-row>
</template>
<script>
let data = []
let data2 = []
function getNewSeries() {
  data2.push({
    x: new Date().getTime(),
    y: Math.floor(Math.random() * (90 - 60 + 1)) + 10
  })
  data.push({
    x: new Date().getTime(),
    y: Math.floor(Math.random() * (90 - 30 + 1)) + 30
  })
}
function resetData(){
// Alternatively, you can also reset the data at certain intervals to prevent creating a huge series 
  data = data.slice(data.length - 10, data.length);
  data2 = data2.slice(data2.length - 10, data2.length);
}
import ChartCard from '../components/cards/ChartCard'
import defaultOptions from '../components/charts/options/default.chart'

export default {
  components: {
    ChartCard
  },
  data: () => ({
    reset: false,
    series: [{
      name: 'series-1',
      type: 'line',
      data: data.slice()
    }],
    series2: [{
      name: 'series-2',
      type: 'line',
      data: data2.slice()
    }],
    options: defaultOptions.getOptions(['#21fc0d']),
    options2: defaultOptions.getOptions(['#ff3503'])
  }),
  ready: function () {
    window.addEventListener('beforeunload', () => {
      window.alert()
    });
  },
  mounted() {
    var me = this
    setInterval(function () {
     getNewSeries()
      me.$refs.chart1.updateSeries([{
        data: data
      }])
      me.$refs.chart2.updateSeries([{
        data: data2
      }])
    }, 1000)
  
    // every 60 seconds, we reset the data to prevent memory leaks
    setInterval(function () {
      resetData()
      
      me.$refs.chart1.updateSeries([{
        data: me.data
      }], false, true)
      me.$refs.chart2.updateSeries([{
        data: me.data2
      }], false, true)
    }, 60000)
  }
}
</script>

<template>
  <v-row>
    <v-col lg="6">
      <ChartCard id="chart" :title="'asdadasd'">
        <apexchart slot="chart" type="line" ref="chart2" :options="options" :series="series"></apexchart>
      </ChartCard>
    </v-col>
  </v-row>
</template>
<script>
let data = []
function getNewSeries() {
  data.push({
    x: new Date().getTime(),
    y: Math.floor(Math.random() * (90 - 30 + 1)) + 30
  })
}
function resetData(){
// Alternatively, you can also reset the data at certain intervals to prevent creating a huge series 
  data = data.slice(data.length - 10, data.length);
}
import ChartCard from '../components/cards/ChartCard'
import defaultOptions from '../components/charts/options/default.chart'

export default {
  components: {
    ChartCard
  },
  data: () => ({
    reset: false,
    data: [],
    series: [{
      data: data.slice()
    }],
    options: defaultOptions.options
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
      
      me.$refs.chart2.updateSeries([{
        data: data
      }])
      console.log(data[data.length - 1].y);
    }, 1000)
  
    // every 60 seconds, we reset the data to prevent memory leaks
    setInterval(function () {
      me.chartOptions.chart.animations.enabled = false
      resetData()
      
      me.$refs.chart2.updateSeries([{
        data: me.data
      }], false, true)
      me.chartOptions.chart.animations.enabled = true
      // alert('Reseted')
    }, 20000)
  }
}
</script>

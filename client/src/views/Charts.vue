<template>
  <v-row>
    <v-col lg="6">
      <ChartCard id="chart" :title="'asdadasd'">
        <apexchart slot="chart" type="line" ref="chart2" :options="chartOptions" :series="series"></apexchart>
      </ChartCard>
    </v-col>
    <v-col lg="6">
      <ChartCard id="chart" :title="'asdadasd'">
        <apexchart slot="chart" type="line" ref="chart" :options="chartOptions" :series="series"></apexchart>
      </ChartCard>
    </v-col>
  </v-row>
</template>
<script>
  var lastDate = 0;
  var data = []
  var TICKINTERVAL = 1000
  let XAXISRANGE = 9000
  function getDayWiseTimeSeries(baseval, count, yrange) {
    var i = 0;
    while (i < count) {
      var x = baseval;
      var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
  
      data.push({
        x, y
      });
      lastDate = baseval
      baseval += TICKINTERVAL;
      i++;
    }
  }
  
  getDayWiseTimeSeries(new Date().getTime(), 10, {
    min: 10,
    max: 90
  })
  
  function getNewSeries(baseval, yrange) {
    var newDate = baseval + TICKINTERVAL;
    lastDate = newDate
  
    for(var i = 0; i< data.length - 10; i++) {
      // IMPORTANT
      // we reset the x and y of the data which is out of drawing area
      // to prevent memory leaks
      data[i].x = newDate - XAXISRANGE - TICKINTERVAL
      data[i].y = 0
    }
  
    data.push({
      x: newDate,
      y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    })
  }
  
  function resetData(){
    // Alternatively, you can also reset the data at certain intervals to prevent creating a huge series 
    data = data.slice(data.length - 10, data.length);
  }
import ChartCard from '../components/Cards/ChartCard'
export default {
  components: {
    ChartCard
  },
  data: () => ({
    series: [{
      data: data.slice()
    }],
    chartOptions: {
            chart: {
              id: 'realtime',
              height: 350,
              type: 'line',
              speed: 300,
              animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                  speed: 1000
                }
              },
              toolbar: {
                show: false
              },
              zoom: {
                enabled: false
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth'
            },
            title: {
              text: 'Dynamic Updating Chart',
              align: 'left'
            },
            markers: {
              size: 0
            },
            xaxis: {
              type: 'datetime',
              range: XAXISRANGE,
            },
            yaxis: {
              max: 100
            },
            legend: {
              show: false
            },
            fill: {
              type: 'gradient',
              gradient: {
                type: "vertical",
                shadeIntensity: 0.5,
                gradientToColors: [], // optional, if not defined - uses the shades of same color in series
                inverseColors: false,
                opacityFrom: 0.99,
                opacityTo: 0.1,
                stops: [0, 90, 100],
                colorStops: []
          }
        },
          },
  }),
  methods: {
    resetData(){
    // Alternatively, you can also reset the data at certain intervals to prevent creating a huge series 
      data = data.slice(data.length - 10, data.length);
    }
  },
  mounted() {
    setInterval(function () {
            getNewSeries(lastDate, {
              min: 10,
              max: 90
            })
            
            this.window.$refs.chart.updateSeries([{
              data: data
            }])
          }, 1000)
        
          // every 60 seconds, we reset the data to prevent memory leaks
          setInterval(function () {
            resetData()
            
            this.window.$refs.chart.updateSeries([{
              data
            }], false, true)
          }, 60000)
  }
}
</script>

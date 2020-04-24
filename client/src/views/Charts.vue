<template>
  <v-row>
    <v-col lg="6">
      <ChartCard id="chart" :title="'asdadasd'">
        <apexchart slot="chart" type="line" ref="chart2" :options="chartOptions" :series="series"></apexchart>
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
import ChartCard from '../components/Cards/ChartCard'
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
    chartOptions: {
            chart: {
              id: 'realtime',
              type: 'line',
              speed: 1000,
              foreColor: '#fff',
              animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                  enabled: true,
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
            markers: {
              size: 0
            },
            xaxis: {
              type: 'datetime',
              range: 10000,
            },
            yaxis: {
              max: 100,
              labels: {
                show: true,
                style: {
                  colors: ['#f3f3f3'],
                },
              }
            },
            legend: {
              show: false
            },
            grid: {
              row: {
                colors: ['#323C4A', 'transparent'],
              }, 
              column: {
                  colors: ['#1d2534', 'transparent'],
              },
              yaxis: {
                lines: {
                  show: false
                }
              },
              xaxis: {
                lines: {
                  show: false
                }
              }
            },
             fill: {
            type: 'solid',
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

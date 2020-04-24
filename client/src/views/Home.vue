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
        <ChartCard :title="'Signal level'">
          <apexchart slot="chart" type="line" ref="chart2" :options="options" :series="series"></apexchart>
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
          <apexchart slot="chart" type="line" :options="options" :series="series"></apexchart>
       </ChartCard>
      </v-col>
      <v-col
        v-else
        cols="12"
        xl="6"
        lg="6"
        md="6"
        sm="12"
        xs="12"
      >
        <v-card class="px-2">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline text-center">Общая информация</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
            <v-list class="transparent">
              <v-list-item
                v-for="stat in stats"
                :key="stat.title"
                class="my-0"
              >
                <div class="d-flex align-center justrify-start" style="width: 60%">
                  <v-list-item-subtitle style="font-size: 16px !important;">
                    {{ stat.title }}
                  </v-list-item-subtitle>
                </div>
                <div class="d-flex align-center justrify-start" style="width: 40%">
                    <v-list-item-icon class="mr-4">
                      <v-icon :color="stat.icon.color">{{ stat.icon.name }}</v-icon>
                    </v-list-item-icon>
                  <v-list-item-title>
                    {{ stat.subtitle }}
                  </v-list-item-title>
                </div>
              </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col
        v-for="stat in stats"
        :key="stat"
        cols="12"
        xl="3"
        lg="3"
        md="3"
        sm="6"
        xs="12"
      >
        <StatCard :stat="stat"/>
      </v-col>
    </v-row>
  </div>
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
// @ is an alias to /src
import StatCard from '../components/Cards/StatCard'
import ChartCard from '../components/Cards/ChartCard'
export default {
  name: 'Home',
  components: {
    StatCard,
    ChartCard,
  },
  mounted() {
    var me = this
    setInterval(function () {
     getNewSeries()
      
      me.$refs.chart2.updateSeries([{
        data: data
      }])
    }, 1000)
  
    // every 60 seconds, we reset the data to prevent memory leaks
    setInterval(function () {
      resetData()
      
      me.$refs.chart2.updateSeries([{
        data: me.data
      }], false, true)
    }, 60000)
  },
  data: () => ({
    windowWidth: window.innerWidth,
    stats: [
      {
        title: 'Channel',
        subtitle: '98',
        icon: {
          name: 'mdi-signal-cellular-2',
          color: 'orange'
        }
      },
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
    options: {
        chart: {
          id: 'realtime',
          speed: 1000,
          foreColor: "#ccc",
          animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        },
        },
         xaxis: {
          type: 'datetime',
          range: 10000,
        },
        stroke: {
          curve: 'smooth',
          width: 3
        },
        grid: {
          borderColor: "#555",
          clipMarkers: false,
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
        tooltip: {
          theme: "dark"
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
    options2: {
        chart: {
          id: 'vuechart-example',
          foreColor: "#ccc" 
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        },
        stroke: {
          curve: 'stepline',
          width: 3
        },
        grid: {
          borderColor: "#555",
          clipMarkers: false,
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
        tooltip: {
          theme: "dark"
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
        animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
            enabled: true,
            delay: 150
        },
        dynamicAnimation: {
            enabled: true,
            speed: 350
        }
    }
      },
      
      series: [{
        name: 'series-1',
        type: 'area',
        data: data.slice()
      }]
  }),
}
</script>
<style scoped>
  .ani {
    transition: all 0.3s ease;
  }
</style>

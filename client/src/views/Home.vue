<template>
  <div>
    <div class="px-7">
    <v-row :justify="'start'">
      <v-col 
        v-for="n in 2"
        :key="n"
        cols="12"
        xl="6"
        lg="6"
        md="6"
        sm="12"
        xs="12"
      >
        <v-card
          class="pa-2 elevation-2"
          outlined
        >
          <apexchart height="250px" width="100%" type="line" :options="options" :series="series"></apexchart>
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
    <v-row>
      <v-col
        v-for="n in 2"
        :key="n"
        cols="12"
        xl="6"
        lg="6"
        md="6"
        sm="12"
        xs="12"
      >
        <DataTable/>
      </v-col>
    </v-row>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import StatCard from '../components/Cards/StatCard'
import DataTable from '../components/DataTable'
export default {
  name: 'Home',
  components: {
    StatCard,
    DataTable
  },
  data: () => ({
    stats: [
      {
        title: 'Capacity',
        subtitle: '105GB',
        icon: {
          name: 'mdi-database',
          color: 'primary'
        },
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
        title: 'Signal strength',
        subtitle: '-85 dBm',
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
    ],
    options: {
        chart: {
          id: 'vuechart-example',
          foreColor: "#ccc" 
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
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
        animations: {
        enabled: false,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
            enabled: true,
            delay: 150
        },
        dynamicAnimation: {
            enabled: false,
            speed: 350
        }
      }
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
        data: [60, 40, 55, 30, 44, 30, 55, 71]
      }]
  }),
}
</script>
<style scoped>
  .ani {
    transition: all 0.3s ease;
  }
</style>

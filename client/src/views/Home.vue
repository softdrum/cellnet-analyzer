<template>
  <div>
    <v-container class="">
    <v-row :justify="'start'">
      <v-col
        cols="12"
        xl="4"
        lg="4"
        md="4"
        sm="6"
        xs="12"
      >
        <v-card
          class="pa-2"
          outlined
          tile
          style="height: 200px; background: #0C1B26; border-radius: 7px"
        >
          <apexchart height="180px" type="line" :options="options" :series="series"></apexchart>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        xl="4"
        lg="4"
        md="4"
        sm="6"
        xs="12"
      >
        <v-card
          class="pa-2"
          outlined
          tile
          style="height: 200px; background: #0C1B26"
        >
          <apexchart height="180px" type="line" :options="options2" :series="series"></apexchart>
        </v-card>
      </v-col>
      <v-col
        v-for="n in 9"
        :key="n"
        cols="12"
        xl="4"
        lg="4"
        md="4"
        sm="6"
        xs="12"
      >
        <v-card
          class="pa-2"
          outlined
          tile
          style="height: 200px; background: #0C1B26"
        >
        
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import ContentCard from '../components/ContentCard'
export default {
  name: 'Home',
  components: {
    // ContentCard
  },
  data: () => ({
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

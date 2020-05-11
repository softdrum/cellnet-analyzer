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
        v-for="(stat, i) in stats"
        :key="i"
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
// @ is an alias to /src
import StatCard from '../components/cards/StatCard'
import ChartCard from '../components/cards/ChartCard'
import defaultOptions from '../components/charts/options/default.chart'
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
  },
  data: () => ({
    options: defaultOptions.getOptions(['#00d0ea']),
    options2: defaultOptions.getOptions(['#fba500']),
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
    series: [{
      name: 'series-1',
      type: 'line',
      data: data.slice()
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

<template>
  <!-- <ChartCard :title="title" :loading="loading" > -->
    <apexchart class="radial-chart1" slot="chart" width="200" type="radialBar" ref="cpuusage"  :options="chartOptions" :series="series"></apexchart>
  <!-- </ChartCard> -->
</template>
<script>
import themes from '@/styles/colors.js'

export default {
  components: {
    // ChartCard
  },
  props: {
    title: String,
    value: Number
  },
  watch: {
    value(val) {
      this.$refs.cpuusage.updateSeries([val])
    }
  },
  computed: {
    chartOptions () {
      return {
        chart: {
          height: 350,
          width: 350,
          type: 'radialBar',
          toolbar: {
            show: false
          }
        },
        colors: [function({ value}) {
          if(value < 20) {
              return '#59C173'
          } else if (value >= 20 && value < 55) {
              return '#FDC830'
          } else if (value >= 55 && value < 76) {
              return '#F37335'
          } else {
              return '#EF473A'
          }
        }],
        plotOptions: {
          radialBar: {
            startAngle: -270,
            endAngle: 90,
              hollow: {
              margin: 0,
              size: '70%',
              background: 'transparent',
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: 'front',
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: this.$vuetify.theme.dark ? themes.dark['background'] : themes.light['background'],
              strokeWidth: '100%',
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0
              }
            },
        
            dataLabels: {
              show: true,
              name: {
                offsetY: -10,
                show: true,
                color: this.$vuetify.theme.dark ? '#404C5C' : '#222222',
                fontSize: '17px'
              },
              value: {
                formatter: function(val) {
                  return parseInt(val) + '%';
                },
                color: this.$vuetify.theme.dark ? '#f1f1f1' : '#222222',
                fontSize: '30px',
                show: true,
              }
            }
          }
        },
        stroke: {
          lineCap: 'round'
        },
        labels: [this.title.toUpperCase()],
      }
    }
  },
  data: () => ({
    gradientTo: ['#F37335'],
    series: [0],
  })
}
</script>
<style scoped>
  .radial-chart1 {
    margin-left: -50px !important;
  }
</style>

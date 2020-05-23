<template>
  <!-- <ChartCard :title="title" :loading="loading" > -->
    <apexchart slot="chart" width="240" type="radialBar" ref="cpuusage"  :options="chartOptions" :series="series"></apexchart>
  <!-- </ChartCard> -->
</template>
<script>

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
  mounted() {
    this.chartOptions.labels = [this.title]
  },
  data: () => ({
    gradientTo: ['#F37335'],
    series: [0],
    chartOptions2: {
      chart: {
        height: 350,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: '#141926'
          },
          background: '#1d2534',
          dataLabels: {
            name: {
              fontSize: '16px',
              color: undefined,
            },
            value: {
              fontSize: '22px',
              color: undefined,
              formatter: function (val) {
                return val + "%";
              }
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            shadeIntensity: 0.15,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91]
        },
      },
      stroke: {
        dashArray: 3
      },
      labels: ['CPU Usage'],
    },
    chartOptions: {
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
            background: '#1d2534',
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
            background: 'rgba(20, 25, 38, 0.9)',
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
              color: '#fff',
              fontSize: '17px'
            },
            value: {
              formatter: function(val) {
                return parseInt(val) + '%';
              },
              color: '#eee',
              fontSize: '30px',
              show: true,
            }
          }
        }
      },
      // fill: {
      //   type: 'gradient',
      //   gradient: {
      //     shade: 'dark',
      //     type: 'radial',
      //     shadeIntensity: 0.5,
      //     // gradientToColors: ['#F37335'], 
      //     inverseColors: true,
      //     opacityFrom: 1,
      //     opacityTo: 1,
      //     stops: [0, 100]
      //   }
      // },
      stroke: {
        lineCap: 'round'
      },
      labels: ['CPU'],
    },
    options: {
      chart: {
        height: 280,
        type: "radialBar",
      },
      series: [0],
      colors: ["#FDC830"],
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: '#141926',
            startAngle: -90,
            endAngle: 90,
          },
          position: 'front',
          dataLabels: {
            name: {
              show: true,
            },
            value: {
              fontSize: "30px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          gradientToColors: ["#F37335"],
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "butt"
      },
      labels: ["CPU Usage"]
    }
  })
}
</script>

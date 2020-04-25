export default {
  getOptions(colors=[], darkTheme=true) {
    const options = {
      chart: {
        type: 'line',
        height: 100,
        width: 200,
        foreColor: darkTheme ? '#476876': '#666',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
              speed: 1000
          }
        },
        toolbar: {
            show: false,
        },
        zoom: {
          enabled: false
        }
      },
      colors: colors,
      grid: {
        borderColor: darkTheme ? '#242e3e': '#ccc',
        show: true,
        xaxis: {
          lines: {
            show: false
          }
        },   
        yaxis: {
            lines: {
                show: true
            }
        },  
      },
      tooltip: {
        enabled: true,
        onDatasetHover: {
            highlightDataSeries: true,
        },
        x: {
            show: true,
            format: 'HH:mm:ss',
            formatter: undefined,
        },
        y: {
            formatter: undefined,
            title: {
                formatter: (seriesName) => seriesName,
            },
        },
        marker: {
            show: true,
        },
      },
      stroke: {
        curve: 'smooth'
      },
      fill: {
        colors: 'transparent'
      },
      markers: {
          size: 0
      },
      xaxis: {
          type: 'datetime',
          range: 10000,
          labels: {
            show: true,
            formatter: function (value) {
              const date = new Date(value)
              return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            }
          }
      },
      yaxis: {
          max: 100,
          min: 0
      }
    }
    return options
  },
  options2: {
    chart: {
      type: 'line',
      speed: 1000,
      foreColor: '#374866',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          enabled: true,
          speed: 1000
        }
      },
      tooltip: {
        enabled: true,
        enabledOnSeries: undefined,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        custom: undefined,
        fillSeriesColor: false,
        theme: false,
        style: {
          fontSize: '12px',
          fontFamily: undefined
        },
        onDatasetHover: {
            highlightDataSeries: true,
        },
        x: {
            show: true,
            format: 'dd.MM.yyyy HH:mm:ss',
            formatter: undefined,
        },
        y: {
            formatter: undefined,
            title: {
                formatter: (seriesName) => seriesName,
            },
      },
    },
      theme: {
        mode: 'dark'
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
      show: true,
      format: 'HH:mm:ss',
      range: 10000
    },
    yaxis: {
      max: 100,
      labels: {
        show: true,
      }
    },
    legend: {
      show: false
    },
    grid: {
      yaxis: {
        lines: {
          show: true
        },
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
}

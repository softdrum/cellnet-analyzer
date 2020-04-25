export default {
  options: {
    chart: {
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
      tooltip: {
        theme: true
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
}

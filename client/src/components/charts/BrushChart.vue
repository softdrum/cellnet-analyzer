<template>
  <div id="wrapper">
    <div id="chart-line2">
      <apexchart type="area" height="230" :options="chartOptions" :series="series"></apexchart>
    </div>
    <div id="chart-line">
      <apexchart type="area" height="130" :options="chartOptionsLine" :series="seriesLine"></apexchart>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    chartData: Array
  },
  mounted() {
    setTimeout(() => {
      this.series = [
      {
        data: this.chartData.slice()
      }
    ]
    this.seriesLine = [
      {
        data: this.chartData.slice()
      }
    ]
    }, 500);
  },
  data: () => ({
          series: [{
            data: [1, 2, 3, 5,25,1300]
          }],
          chartOptions: {
            chart: {
              id: 'chart2',
              type: 'line',
              height: 230,
              toolbar: {
                autoSelected: 'pan',
                show: false
              }
            },
            stroke: {
              width: 2,
              curve: 'smooth'
            },
            dataLabels: {
              enabled: false
            },
            colors: ['#008FFB'],
            fill: {
              type: 'gradient',
              gradient: {
                opacityFrom: 0.91,
                opacityTo: 0.1,
              }
            },
            xaxis: {
              type: 'datetime',
            },
            theme: {
              palette: 'palette8' // upto palette10
            },
            markers: {
              size: 0
            },
          },
          
          seriesLine: [{
            data: [1, 2, 3, 5,25,13000]
          }],
          chartOptionsLine: {
            chart: {
              id: 'chart1',
              height: 130,
              type: 'area',
              brush:{
                target: 'chart2',
                enabled: true
              },
              selection: {
                enabled: true,
                fill: {
                  color: "#fff",
                  opacity: 0.1
                }
              },
            },
            colors: ['#f30453'],
            fill: {
              type: 'gradient',
              gradient: {
                opacityFrom: 0.91,
                opacityTo: 0.1,
              }
            },
            xaxis: {
              type: 'datetime',
              tooltip: {
                enabled: false
              }
            },
            yaxis: {
              tickAmount: 2
            }
          },
          
          
  })
}
</script>

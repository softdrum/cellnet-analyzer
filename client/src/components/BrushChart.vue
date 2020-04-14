<template>
  <div id="wrapper">
    <div id="chart-line2">
      <apexchart type="line" height="230" :options="chartOptions" :series="series"></apexchart>
    </div>
    <div id="chart-line">
      <apexchart type="area" height="130" :options="chartOptionsLine" :series="seriesLine"></apexchart>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
          series: [{
            data: [1, 2, 3 ,2, 1,2]
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
            colors: ['#546E7A'],
            stroke: {
              width: 3
            },
            dataLabels: {
              enabled: false
            },
            fill: {
              opacity: 1,
            },
            markers: {
              size: 0
            },
          },
          
          seriesLine: [{
            data: [1, 2, 3 ,2, 1,2]
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
              },
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

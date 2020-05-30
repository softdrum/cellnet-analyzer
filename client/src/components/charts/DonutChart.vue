<template>
  <!-- <ChartCard :title="'CPU Usage'" :loading="loading" > -->
    <apexchart slot="chart" type="donut" :options="chartOptions" :series="series"></apexchart>
  <!-- </ChartCard> -->
</template>
<script>
// import ChartCard from '@/components/cards/ChartCard'

export default {
  components: {
    // ChartCard
  },
  data: () => ({
    series: [44, 55, 41, 17, 15],
    chartOptions: {
      chart: {
        type: 'donut',
      },
       plotOptions: {
        pie: {
          expandOnClick: false
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  })
}
</script>

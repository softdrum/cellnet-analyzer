<template>
  <v-row>
    <v-col
      v-for="chart in charts"
      :key="chart.refName"
      cols="12"
      xl="6"
      lg="6"
      md="6"
      sm="6"
      xs="12"
    >
      <chart-card :title="chart.title">
        <realtime-chart
          :refName="chart.refName"
          :data="chart.data"
          :color="chart.color"
          :scaleY="chart.scale"
        />
      </chart-card>
    </v-col>
  </v-row>
</template>

<script>
import RealtimeChart from '../components/charts/RealtimeChart'
import ChartCard from '../components/cards/ChartCard'

export default {
  name: 'ChartGroup',
  components: {
    RealtimeChart,
    ChartCard,
  },
  props: {
    charts: {
      type: Array,
      default: () => []
    }
  },
}
</script>

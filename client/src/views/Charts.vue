<template>
  <v-row>
   <v-col
        cols="12"
        xl="6"
        lg="6"
        md="6"
        sm="6"
        xs="12"
      >
          <!-- {{ $store.state.modem.signal_level }} -->
        <ChartCard :title="'Signal level'">
          <apexchart  height="250" slot="chart" type="line" ref="chart1" :options="options" :series="series"></apexchart>
       </ChartCard>
      </v-col>
      <v-col
        cols="12"
        xl="6"
        lg="6"
        md="6"
        sm="6"
        xs="12"
      >
        <ChartCard :title="'Bit Error Rate'">
          <apexchart height="250" slot="chart" ref="chart2" type="line" :options="options2" :series="series2"></apexchart>
       </ChartCard>
      </v-col>
      <v-col
        cols="12"
        xl="6"
        lg="6"
        md="6"
        sm="6"
        xs="12"
      >
        <ChartCard :title="'Bit Error Rate'">
          <apexchart height="250" slot="chart" ref="chart2" type="line" :options="options2" :series="series2"></apexchart>
       </ChartCard>
      </v-col>
      <v-col
        cols="12"
        xl="6"
        lg="6"
        md="6"
        sm="6"
        xs="12"
      >
        <ChartCard :title="'Bit Error Rate'">
          <apexchart height="250" slot="chart" ref="chart2" type="line" :options="options2" :series="series2"></apexchart>
       </ChartCard>
      </v-col>
  </v-row>
</template>
<script>
import ChartCard from '../components/cards/ChartCard'
import defaultOptions from '../components/charts/options/default.chart'

export default {
  components: {
    ChartCard
  },
  data: () => ({
    options: defaultOptions.getOptions(['#00d0ea']),
    options2: defaultOptions.getOptions(['#fba500']),
  })
}
</script>

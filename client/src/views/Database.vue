<template>
  <div>
    <v-row :justify="'center'">
      <v-col cols="12">
        <ChartCard :title="'Signal level'">
          <BrushChart slot="chart" :chartData="chartData" />
        </ChartCard>
      </v-col>
      <v-col cols="12">
        <DataTable :headers="headers" :data="data"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import DataTable from '../components/DataTable'
import BrushChart from '../components/BrushChart'
import tableHeaders from '../components/table.headers'
import ChartCard from '../components/Cards/ChartCard'

import dateFilter from '../utils/filters/date.filter'
export default {
  name: 'Database',
  components: {
    BrushChart,
    DataTable,
    ChartCard
  },
  data: () => ({
    data: [],
    chartData: [],
    date: null,
    headers: tableHeaders.signal
  }),
  async mounted() {
    try {
      this.data = await this.$store.dispatch('getDataFromDatabase', 'signal')
      this.data.forEach(element => {
        this.chartData.push({
          x: new Date(element.createdAt),
          y: element.signal_level
        })
        element.createdAt = dateFilter(new Date(element.createdAt), 'datetime')
      })
      console.log(this.chartData);
    } catch (error) {
      console.log(error);
      this.$error('Не удалось загрузить данные')
    }
  }
}
</script>

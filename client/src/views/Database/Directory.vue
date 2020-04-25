<template>
  <div>
    <v-btn to="/database" text>
      <v-icon>mdi-arrow-left</v-icon>
      Back
    </v-btn>
    <v-row :justify="'center'">
      <v-col cols="12" v-if="directory === 'signals'">
        <ChartCard :loading="loading">
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
import DataTable from '@/components/tables/DataTable'
import BrushChart from '@/components/charts/BrushChart'
import tableHeaders from '@/components/tables/table.headers'
import ChartCard from '@/components/cards/ChartCard'

import dateFilter from '@/utils/filters/date.filter'
export default {
  name: 'Directory',
  components: {
    BrushChart,
    DataTable,
    ChartCard
  },
  data: () => ({
    loading: true,
    data: [],
    chartData: [],
    date: null,
    headers: tableHeaders.signal,
    directory: 'signal'
  }),
  methods: {
    setupTable(directory) {
      switch (directory) {
        case 'signals': return tableHeaders.signal
        case 'basestations': return tableHeaders.bs
      }
    },
    async addToDB() {
      const data = [
        {
          lat: 39.3563,
          long: 58.3554,
          operator: 'MTS',
          generation: 4,
          radius: 1000,
          arfcn: 56,
          rx_level: 87,
        }
      ]
      try {
          await this.$store.dispatch('addDataInDatabase', {
          tableName: this.directory,
          data: data
        })
      } catch (error) {
        console.log(error);
        this.$error('Не удалось добавить данные')
      }
    }
  },
  async mounted() {
    this.directory = this.$route.params.directory
    this.headers = this.setupTable(this.directory)
    // this.addToDB()
    try {
      this.data = await this.$store.dispatch('getDataFromDatabase', this.directory)
      this.data.forEach(element => {
        this.chartData.push({
          x: new Date(element.createdAt),
          y: element.signal_level
        })
        element.createdAt = dateFilter(new Date(element.createdAt), 'datetime')
        this.loading = false
      })
    } catch (error) {
      console.log(error);
      this.$error('Не удалось загрузить данные')
    }
  }
}
</script>

<template>
  <div>
    <v-row :justify="'center'">
      <v-col cols="12">
        <BrushChart v-if="5 < 2"/>
      </v-col>
      <v-col cols="12">
        <DataTable :datad="data"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
// import ContentCard from '../components/ContentCard'
import DataTable from '../components/DataTable'
import BrushChart from '../components/BrushChart'
export default {
  name: 'Database',
  components: {
    BrushChart,
    DataTable
  },
  data: () => ({
    data: null
  }),
  async mounted() {
    try {
      this.data = await this.$store.dispatch('getDataFromDatabase')
    } catch (error) {
      this.$error('Не удалось загрузить данные')
    }
  }
}
</script>

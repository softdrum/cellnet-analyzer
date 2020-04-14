<template>
  <div>
    <v-row :justify="'center'">
      <v-col cols="12">
        <BrushChart />
      </v-col>
      <v-col cols="12">
        <DataTable />
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
  }
}
</script>

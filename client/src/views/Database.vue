<template>
  <div>
    <v-row :justify="'center'">
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
export default {
  name: 'Database',
  components: {
    // ContentCard
    DataTable
  }
}
</script>

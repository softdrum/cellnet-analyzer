<template>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="data"
      :search="search"
      dense
    ></v-data-table>
  </v-card>
</template>
<script>
import tableHeaders from './table.headers'
  export default {
    props: {
      // data: Array,
      // headers: Array
    },
    data () {
      return {
        search: '',
        headers: tableHeaders.bs,
        data: [
          {
            lat: 59.33333,
            long: 39.11311,
            radius: 1000,
            operator: 'Megafon',
            arfcn: 104,
            rx: -66
          },
          {
            lat: 59.33333,
            long: 39.11311,
            radius: 1000,
            operator: 'TELE2',
            arfcn: 17,
            rx: -92
          },
          {
            lat: 59.33333,
            long: 39.11311,
            radius: 1000,
            operator: 'MTS',
            arfcn: 10,
            rx: -90
          },
          {
            lat: 59.33333,
            long: 39.11311,
            radius: 1000,
            operator: 'Megafon',
            arfcn: 32,
            rx: -44
          },
          {
            lat: 59.33333,
            long: 39.11311,
            radius: 1000,
            operator: 'Beeline',
            arfcn: 66,
            rx: -35
          }
        ]
      }
    },
  }
</script>

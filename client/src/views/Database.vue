<template>
  <div>
    <v-container class="">
    <v-row :justify="'start'">
      <v-col
        v-for="n in 3"
        :key="n"
        cols="12"
        xl="4"
        lg="4"
        md="4"
        sm="6"
        xs="12"
      >
        <v-card
          class="pa-2"
          outlined
          tile
          style="height: 200px; background: #412"
        >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import ContentCard from '../components/ContentCard'

export default {
  name: 'Database',
  components: {
    // ContentCard
  }
}
</script>

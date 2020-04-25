<template>
  <v-bottom-navigation
    :value="activeBtn"
    grow
    fixed
  >
    <v-btn to="/database">
      <span>Database</span>
      <v-icon>mdi-database</v-icon>
    </v-btn>

    <v-btn to="/">
      <span>Main</span>
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>

    <v-btn>
      <span>Map</span>
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
  export default {
    data () {
      return {
        activeBtn: 1,
      }
    },
  }
</script>

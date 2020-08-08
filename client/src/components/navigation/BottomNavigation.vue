<template>
  <v-bottom-navigation
    :value="activeBtn"
    grow
    fixed
  >
    <v-btn
      v-for="route in routes"
      :key="route.title"
      :to="route.link"
    >
      <span>{{ route.title }}</span>
      <v-icon>{{ route.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
  export default {
    data () {
      return {
        activeBtn: 1,
        routes: [
          { title: 'Map', icon: 'mdi-map', link: '/map'},
          { title: 'Charts', icon: 'mdi-chart-line', link: '/charts'},
          { title: 'Dashboard', icon: 'mdi-view-dashboard', link: '/'},
          { title: 'Database', icon: 'mdi-database', link: '/database'},
          { title: 'System', icon: 'mdi-engine', link: '/system'},
        ],
      }
    },
  }
</script>

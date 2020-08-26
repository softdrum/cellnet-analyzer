<template>
  <v-bottom-navigation
    v-model="activeBtn"
    fixed
    grow
  >
    <v-btn
      v-for="route in routes"
      :key="route.title"
      :to="route.link"
    >
      <!-- <span>{{ route.title }}</span> -->
      <v-icon>{{ route.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
  export default {
    name: 'TheBottomNavigation',
    data () {
      return {
        activeBtn: 3,
        routes: [
          { title: 'Map', icon: 'icon-map-outlined', link: '/map'},
          { title: 'Charts', icon: 'icon-graph-outlined', link: '/charts'},
          { title: 'Dashboard', icon: 'icon-dashboard-outlined', link: '/'},
          { title: 'Database', icon: 'icon-database-outlined', link: '/database'},
          { title: 'System', icon: 'icon-chip-outlined', link: '/system'},
        ],
      }
    },
    mounted () {
      this.activeBtn = this.routes.findIndex((elem) => {
          return elem.link === this.$route.fullPath
      })
    }
  }
</script>

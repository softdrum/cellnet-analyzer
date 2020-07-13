<template>
    <v-navigation-drawer
      :mini-variant="mini"
      floating
      style="height: 100vh;"
      class="elevation-6"
      dark
      permanent
      fixed
    >
      <v-list-item class="px-2 py-1">
        <v-list-item-avatar
          @click.stop="sidebarHandler"
          style="cursor: pointer"
        >
          <v-icon color="cyan">mdi-arch</v-icon>
        </v-list-item-avatar>

        <v-list-item-title>Mobile Tester</v-list-item-title>

        <v-btn
          icon
          @click.stop="sidebarHandler"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider ></v-divider>
      <v-list class="pt-0">
        <v-list-item-group mandatory>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :ripple="false"
            :active-class="'side-item'"
            :to="item.link"
          >
            <v-list-item-icon >
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
export default {
  name: 'Sidebar',
  data () {
      return {
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard', link: '/'},
          { title: 'Charts', icon: 'mdi-chart-line', link: '/charts'},
          { title: 'Map', icon: 'mdi-map', link: '/map'},
          { title: 'Database', icon: 'mdi-database', link: '/database'},
          { title: 'System', icon: 'mdi-system', link: '/system'},
          { title: 'Settings', icon: 'mdi-cog-outline', link: '/user-settings'},
        ],
      mini: false
    }
  },
  methods: {
    sidebarHandler() {
      this.mini = !this.mini
      this.$emit('sideClicked')
    }
  }
}
</script>
<style scoped>
/* .side-dark {
  background: #06141F !important;
}
.side-item {
  color:#4E9F40!important;
  background-color: #0A1924;
}
.v-list-item--link::before { background-color: #0A1924;}
.v-list-item--link:hover { background-color: #0C1B26;} */
</style>

<template>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="mini"
      floating
      style="height: 100vh; z-index: 4"
      class="elevation-4"
      dark
    >
      <v-list-item class="px-2">
        <v-list-item-avatar
          @click.stop="mini = !mini"
          style="cursor: pointer"
        >
          <v-icon>mdi-radar</v-icon>
        </v-list-item-avatar>

        <v-list-item-title>Cellnet Anal</v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = true"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider ></v-divider>
      <v-list>
        <v-list-item-group mandatory>
          <v-list-tile
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item
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
          </v-list-tile>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
export default {
  name: 'sidebar',
  data () {
      return {
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard', link: '/'},
          { title: 'Charts', icon: 'mdi-chart-line', link: '/charts'},
          { title: 'Map', icon: 'mdi-map', link: '/map'},
          { title: 'Database', icon: 'mdi-database', link: '/database' },
          { title: 'Settings', icon: 'mdi-cog-outline', link: '/user-settings'},
        ],
      mini: false
    }
  }
}
</script>
<style scoped>
.sidebar {
}
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

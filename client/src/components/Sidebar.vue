<template>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="mini"
      dark
      floating
      :color="'side-dark'"
      class="sidebar"
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
          { title: 'Photos', icon: 'mdi-image', link: '/database' },
          { title: 'About', icon: 'mdi-help-box', link: '/register'},
        ],
      mini: false
    }
  }
}
</script>
<style scoped>
.sidebar {
}
.side-dark {
  background: #06141F !important;
}
.side-item {
  color:#4E9F40!important;
  background-color: #0A1924;
}
.v-list-item--link::before { background-color: #0A1924;}
.v-list-item--link:hover { background-color: #0C1B26;}
</style>

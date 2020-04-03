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
            :ripple="{ class: 'blue--text' }"
            :active-class="'side-item'"
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
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Photos', icon: 'mdi-image' },
          { title: 'About', icon: 'mdi-help-box' },
        ],
      mini: false
    }
  }
}
</script>
<style scoped>
.sidebar {
  color: tomato !important;
}
.side-dark {
  background: #06141F !important;
}
.side-item {
  color:#4E9F40!important;
}
.v-list-item--link::before { background-color: rgb(17, 36, 51);}
.v-list-item--link:hover { background-color: #0A1924;}
</style>

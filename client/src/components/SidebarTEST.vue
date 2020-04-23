<template>
    <div
      class="sidebar"
      :class="{sidebarFull: full}"
    >
      <v-list-item class="py-1 px-3">
        <v-list-item-avatar
          @click.stop="sidebarHandler"
          style="cursor: pointer"
        >
          <v-icon>mdi-radar</v-icon>
        </v-list-item-avatar>

        <v-list-item-title>Cellnet Anal</v-list-item-title>

        <v-btn
          icon
          v-if="full"
          @click.stop="sidebarHandler"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider ></v-divider>
      <v-list class="pt-0">
        <v-list-item-group mandatory>
          <v-list-item
            class="pl-5"
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
    </div>
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
          { title: 'Database', icon: 'mdi-database', link: '/database' },
          { title: 'Settings', icon: 'mdi-cog-outline', link: '/user-settings'},
        ],
      full: true
    }
  },
  methods: {
    sidebarHandler() {
      this.full = !this.full
      this.$emit('sideClicked')
    }
  }
}
</script>
<style scoped>
.sidebar {
  position: fixed;
  width: 64px;
  height: 100vh;
  background-color: #1d2534;
  transition: width 0.1s ease-in;
}
.sidebarFull {
  width: 264px;
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

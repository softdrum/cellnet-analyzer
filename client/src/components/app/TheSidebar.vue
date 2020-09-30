<template>
    <v-navigation-drawer
      class="elevation-6 disable-scrollbars"
      style="height: 100vh; overflow: hidden !important;"
      :mini-variant="!value"
      permanent
      floating
      fixed
    >
      <v-list-item class="px-2 py-1">
        <v-list-item-avatar
          @click.stop="sidebarHandler"
          style="cursor: pointer"
        >
          <v-icon color="accent">icon-bonch</v-icon>
        </v-list-item-avatar>

        <v-list-item-title>Mobile Tester</v-list-item-title>

        <v-btn
          icon
          @click.stop="sidebarHandler"
        >
          <v-icon>icon-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider ></v-divider>
      <v-list class="pt-0" flat>
        <v-list-item-group mandatory color="accent">
          <v-list-item
            :active-class="'active-block'"
            v-for="item in items"
            :key="item.title"
            :ripple="false"
            :to="item.link"
            link
          >
            <template v-slot:default="{ active }">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content :class="{'text--secondary': !active}">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
           </template>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
export default {
  name: 'TheSidebar',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
      return {
        items: [
          { title: 'Dashboard', icon: 'icon-dashboard', link: '/'},
          { title: 'Charts', icon: 'icon-graph', link: '/charts'},
          { title: 'Map', icon: 'icon-map', link: '/map'},
          { title: 'Database', icon: 'icon-database', link: '/database'},
          { title: 'System', icon: 'icon-chip', link: '/system'},
          { title: 'Settings', icon: 'icon-cog', link: '/user-settings'},
        ],
      mini: false
    }
  },
  methods: {
    sidebarHandler() {
      this.$emit('input', !this.value)
    }
  }
}
</script>

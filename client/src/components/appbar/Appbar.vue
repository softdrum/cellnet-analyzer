<template>
  <div>
    <v-app-bar
    flat
    class="mynav px-4"
    :class="{fullNav: fullMode}"
    >
      <div class="d-flex align-center justify-space-between" style="width: 100%;">
        <div><div class="font-weight-light" style="font-size: 1.25rem;">{{ pageName }}</div></div>
        <Battery :level="100" v-if="2 < 1"/>
        <span class="black-text">{{date | date('time')}}</span>
        <v-menu
          transition="slide-y-transition"
          bottom
        >
          <template v-slot:activator="{ on, attrs }">
            <div
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-account</v-icon>
              {{username}}
            </div>
          </template>
          <v-list>
            <v-list-item
              @click="logout()"
            >
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <v-divider></v-divider>
  </div>
</template>
<script>
import Battery from '@/components/appbar/Battery'
import { mapGetters } from 'vuex'
export default {
  name: 'Navbar',
  components: {
    Battery
  },
  props: {
    fullMode: Boolean
  },
  data: () => ({
    date: new Date(),
    interval: null,
    items: [
      { title: 'Profile' },
      { title: 'Logout' },
    ],
  }),
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
  },
  computed: {
    ...mapGetters(['username']),
    pageName() {
      const path = this.$route.fullPath
      switch (path) {
        case '/database': return 'Database'
        case '/database/basestations': return 'Basestations'
        case '/database/signals': return 'Signals'
        case '/charts': return 'Charts'
        case '/map': return 'Map'
        default: return 'Main dashboard'
      }
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
  },
}
</script>
<style scoped>
.mynav {
  height: 64px !important;
  background: transparent !important;
}
.fullNav {
  padding-left: 256px !important;
}
</style>

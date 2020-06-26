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
        <v-spacer></v-spacer>
         <div class="d-flex align-center font-weight-regular" style="font-family: roboto;color: #404C5C; font-size: 1rem">
          Network: 
          <v-menu
            transition="slide-y-transition"
            bottom
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :loading="loading"
                v-bind="attrs"
                v-on="on"
                class="elevation-0" style="font-family: roboto;color: #404C5C; font-size: 1rem"
              >
                {{ networkMode }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, i) of items"
                :key="i"
                @click="changeNetwork(item.title)"
              >
                <v-list-item-title> {{item.title}} </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <v-menu
          v-if="userLoggedIn"
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
import { mapState, mapGetters } from 'vuex'
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
    loading: false,
    networkMode: 'LTE',
    items: [
      { title: 'LTE' },
      { title: '3G' },
      { title: 'GSM' },
    ],
  }),
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
    changeNetwork (network) {
      this.loading = true
      this.$socket.client.emit('changeMode', network, (response) => {
        if (response.msg === 'success') this.$success('Network mode successfully changed')
        else {
          if (response.msg === 'No service') this.networkMode = 'No service'
          this.$error(response.msg)
        }
        this.loading = false
      });
    }
  },
  computed: {
    ...mapState({
      userLoggedIn: state => state.auth.userLoggedIn
    }),
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

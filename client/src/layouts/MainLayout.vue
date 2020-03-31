<template>
    <v-app>
        <!-- <Sidebar @sideClick="isShown = !isShown" :class="{sidebarOpened: isShown}"/> -->
        <Navbar  :class="{fullNavbar: isShown}"/>
        <div :class="{fullNavbar: isShown}">
          <p v-if="this.$store.state.auth.userLoggedIn">Залогинен</p>
          {{this.$store.state.auth.user}}
          <h1>Signal level: {{ this.$store.state.modem.signalLevel }}</h1>
          <button
            v-if="this.$store.state.auth.userLoggedIn"
            @click="logout"
          >
            Log out
          </button>
        </div>
        <v-bottom-navigation
          v-model="bottomNav"
          dark
          shift
        >
          <v-btn value="recent">
            <span>Recent</span>
            <v-icon>mdi-history</v-icon>
          </v-btn>

          <v-btn value="favorites">
            <span>Favorites</span>
            <v-icon>mdi-heart</v-icon>
          </v-btn>

          <v-btn value="nearby">
            <span>Nearby</span>
            <v-icon>mdi-map-marker</v-icon>
          </v-btn>
        </v-bottom-navigation>
    </v-app>
</template>
<script>
// import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
export default {
  name: 'main',
  components: {
    // Sidebar,
    Navbar
  },
  data: () => ({
    isShown: false
  }),
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
    getData() {
      this.$store.dispatch('getData')
    }
  },
  mounted() {
    setInterval(() => {
      this.getData()
    }, 1000);
  }
}
</script>
<style>
  *{
    margin: 0px;
    padding: 0px;
  }
  .sidebarOpened{
    width: 250px;
  }
  .fullNavbar {
    padding-left: 260px;
  }
</style>

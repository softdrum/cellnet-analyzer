<template>
    <v-app>
        <!-- <Sidebar @sideClick="isShown = !isShown" :class="{sidebarOpened: isShown}"/>
        <Navbar />
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
        </div> -->
            <div class="d-flex">
              <div class="">
                <Sidebar @sideClick="isShown = !isShown" :class="{sidebarOpened: isShown}" />
              </div>
              <div class="right-content">
                <Navbar />
                <v-divider></v-divider>
              </div>
            </div>
    </v-app>
</template>
<script>
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
export default {
  name: 'main',
  components: {
    Sidebar,
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
  .right-content {
    height: 100vh;
    width: 100%;
    background: #051018;
  }
</style>

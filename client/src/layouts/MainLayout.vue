<template>
    <v-app>
      <div class="d-flex">
        <div class="">
          <Sidebar @sideClick="isShown = !isShown" :class="{sidebarOpened: isShown}"/>
        </div>
        <div class="right-content">
          <Navbar class="nav-z"/>
          <v-divider></v-divider>
          <transition name="fade" mode="out-in">
            <router-view style="z-index: 1;"/>
          </transition>
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
  .nav-z {
    z-index: 1000;
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease-in-out, transform 0.3s ease;
  }
 .fade-enter-active {
   transition-delay: 0.1s;
 }
 .fade-enter {
   opacity: 0;
   transform: translateY(50px)
 }
 .fade-enter-to {
   opacity: 1;
   transform: translateY(0px);
 }
 .fade-leave {
   opacity: 1;
   transform: translateY(0px);
 }
 .fade-leave-to {
   opacity: 0;
   transform: translateY(100px)
 }
</style>

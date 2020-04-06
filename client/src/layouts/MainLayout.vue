<template>
    <div>
      <div class="d-flex" v-if="h > 700">
        <div class="" >
          <Sidebar @sideClick="isShown = !isShown" :class="{sidebarOpened: isShown}"/>
        </div>
        <div class="right-content">
          <Navbar class="nav-z"/>
          <v-divider dark></v-divider>
          <transition name="fade" mode="out-in">
            <router-view/>
          </transition>
        </div>
      </div>
      <div v-else style="background: #051018;">
        <Navbar class="nav-z"/>
        <transition name="fade" mode="out-in">
            <router-view/>
          </transition>
        <BottomNavigation />
      </div>
    </div>
</template>
<script>
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import BottomNavigation from '../components/BottomNavigation'
export default {
  name: 'main',
  components: {
    Sidebar,
    Navbar,
    BottomNavigation
  },
  data: () => ({
    isShown: false,
    h: window.innerWidth
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
  .sidebarOpened{
    width: 250px;
  }
  .fullNavbar {
    padding-left: 260px;
  }
  .right-content {
    height: 100%;
    width: 100%;
    background: #051018;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease-in-out, transform 0.3s ease;
  }
 /* .fade-enter-active {
   transition-delay: 0.0s;
 } */
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

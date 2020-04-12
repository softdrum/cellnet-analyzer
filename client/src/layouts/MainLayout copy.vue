<template>
    <div>
      <div class="d-flex" v-if="h > 700"> 
        <Sidebar @sideClicked="isShown = !isShown"/>
        <Navbar class="nav-z"/>
        <div class="right-content" :class="{sidebarOpened: isShown}">
          <v-divider></v-divider>
          <transition name="fade" mode="out-in">
            <router-view/>
          </transition>
        </div>
      </div>
      <div v-else>
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
    isShown: true,
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
    padding-left: 256px !important;
  }
  .fullNavbar {
    padding-left: 260px;
  }
  .right-content {
    height: 100%;
    width: 100%;
    padding-left: 56px;
    transition: padding 0.3 ease !important;
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

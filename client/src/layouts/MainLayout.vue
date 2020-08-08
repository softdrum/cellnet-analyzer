<template>
  <div v-resize="onResize">
    <Sidebar @sideClicked="opened = !opened" v-if="desktop"/>
    <BottomNavigation v-else />
    <div class="d-flex">
      <div v-if="desktop" class="ghostSidebar" :hidden="sideHidden" :class="{sideOpened: opened}"></div>
      <div class="content">
        <Appbar class="side-animation" v-if="!wide"/>
        <transition name="fade" mode="out-in">
        <v-container fluid class="pl-8 pr-6" v-if="!wide">
          <transition name="fade" mode="out-in">
            <router-view />
          </transition>
        </v-container>
        <transition name="fade" mode="out-in" v-else>
            <router-view />
        </transition>
        </transition>
    </div>
    </div>
  </div>
</template>
<script>
import Sidebar from '@/components/navigation/Sidebar'
import Appbar from '@/components/appbar/Appbar'
import BottomNavigation from '@/components/navigation/BottomNavigation'

export default {
  name: 'main',
  components: {
    Appbar,
    Sidebar,
    BottomNavigation
  },
  data: () => ({
    desktop: true,
    opened: true,
    sideHidden: false
  }),
  methods: {
    onResize () {
      this.desktop = window.innerWidth > 900 ? true : false
    }
  },
  computed: {
    wide () {
      if (this.$route.fullPath === '/map') return true
      else return false
    }
  }
}
</script>
<style scoped>
  .content {
    width: 100%;
  }
  .sideOpened {
    width: 312px !important;
  }
  .ghostSidebar {
    width: 56px;
    transition: width 0.1s ease-in;
  }
  .full {
    padding-left: 260px !important;
  }
  .wide {
    padding-left: 0px !important;
    padding-right: 100px !important;
  }
</style>

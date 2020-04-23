<template>
  <div>
    <Sidebar @sideClicked="opened = !opened"/>
    <div class="d-flex">
      <div class="ghostSidebar" :class="{sideOpened: opened}"></div>
      <div class="content">
        <Navbar class="side-animation"/>
          <v-container fluid class="pl-8 pr-6">
            <transition name="fade" mode="out-in">
              <router-view />
            </transition>
          </v-container>
    </div>
    </div>
  </div>
</template>
<script>
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
export default {
  components: {
    Sidebar,
    Navbar
  },
  data: () => ({
    opened: true
  }),
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
</style>

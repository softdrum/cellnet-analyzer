<template>
  <div>
    <Sidebar @sideClicked="full = !full"/>
    <Navbar class="side-animation" :fullMode="false" />
    <div class="content side-animation" :class="{full: false}">
        <div class="px-7">
          <transition name="fade" mode="out-in">
            <router-view />
          </transition>
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
    full: false
  }),
}
</script>
<style scoped>
  .content {
    padding-left: 60px;
  }
  .full {
    padding-left: 260px !important;
  }
</style>

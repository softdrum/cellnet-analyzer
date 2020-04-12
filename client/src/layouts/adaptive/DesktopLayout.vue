<template>
  <div>
    <Sidebar @sideClicked="full = !full"/>
    <Navbar class="side-animation" :fullMode="!full" />
    <div class="content side-animation" :class="{full: !full}">
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
    padding-left: 56px;
  }
  .full {
    padding-left: 256px !important;
  }
</style>

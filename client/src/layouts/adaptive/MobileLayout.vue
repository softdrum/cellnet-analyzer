<template>
  <div>
    <Navbar />
    <div class="px-7">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </div>
    <BottomNavigation />
  </div>
</template>
<script>
import BottomNavigation from '@/components/BottomNavigation'
import Navbar from '@/components/Navbar'

export default {
  components: {
    BottomNavigation,
    Navbar
  },
}
</script>
<style scoped>
  
</style>

<template>
  <div>
    <Appbar />
    <div class="px-7">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </div>
    <BottomNavigation />
  </div>
</template>
<script>
import BottomNavigation from '@/components/navigation/BottomNavigation'
import Appbar from '@/components/appbar/Appbar'

export default {
  components: {
    BottomNavigation,
    Appbar
  },
}
</script>
<style scoped>
  
</style>

<template>
  <div>
    <Appbar />
    <div class="px-7">
      <transition name="fade" mode="out-in">
        <v-container fluid class="px-0">
          <router-view/>
        </v-container>
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

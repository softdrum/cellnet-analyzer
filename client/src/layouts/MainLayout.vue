<template>
    <div>
      <div v-if="windowWidth > 700"> 
        <DesktopLayout />
      </div>
      <div v-else>
        <MobileLayout />
      </div>
    </div>
</template>
<script>
import DesktopLayout from './adaptive/DesktopLayout'
import MobileLayout from './adaptive/MobileLayout'
export default {
  name: 'main',
  components: {
    DesktopLayout,
    MobileLayout
  },
  data: () => ({
    windowWidth: window.innerWidth
  }),
  methods: {
    getData() {
      this.$store.dispatch('getData')
    }
  },
  mounted() {
    // setInterval(() => {
    //   this.getData()
    // }, 1000);
  }
  
}
</script>


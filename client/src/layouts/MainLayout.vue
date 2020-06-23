<template>
    <div v-resize="onResize">
      <div v-if="desktop"> 
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
    desktop: true
  }),
  methods: {
    onResize () {
      this.desktop = window.innerWidth > 900 ? true : false
    }
  },
}
</script>


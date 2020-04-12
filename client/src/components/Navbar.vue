<template>
  <v-app-bar
  flat
  class="mynav"
  :class="{fullNav: fullMode}"
  >
    <div class="px-3"><h2 class="font-weight-light">Main dashboard</h2></div>
  </v-app-bar>
</template>
<script>
export default {
  name: 'Navbar',
  props: {
    fullMode: Boolean
  }
}
</script>
<style scoped>
.mynav {
  height: 56px !important;
  padding-left: 56px;
  background: transparent !important;
}
.fullNav {
  padding-left: 256px !important;
}
</style>

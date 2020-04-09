<template>
  <v-app style="
  transition: all 0.7s cubic-bezier(0.075, 0.82, 0.165, 1);">
    <component :is="layout">
      <router-view/>
    </component>
  </v-app>
</template>
<script>
import EmptyLayout from './layouts/EmptyLayout'
import MainLayout from './layouts/MainLayout'
export default {
  components: {
    EmptyLayout, MainLayout
  },
  mounted() {
    this.$vuetify.theme.dark = this.$store.state.darkTheme
  },
  computed: {
    layout() {
      console.log(this.$route.meta);
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
}
</script>
<style>
.v-card {
   border: none !important;
}
</style>

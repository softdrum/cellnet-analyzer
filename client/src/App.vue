<template>
  <v-app style="transition: background 0.7s cubic-bezier(0.075, 0.82, 0.165, 1);">
    <Snackbar />
    <component class="main-container" :is="layout">
      <router-view/>
    </component>
  </v-app>
</template>
<script>
import EmptyLayout from './layouts/EmptyLayout'
import MainLayout from './layouts/MainLayout'
import Snackbar from './components/app/Snackbar'
export default {
  components: {
    EmptyLayout,
    MainLayout,
    Snackbar
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
@import './styles/animation.css';
@import './styles/scrollbar.scss';
.v-card {
   border: none !important;
}
</style>

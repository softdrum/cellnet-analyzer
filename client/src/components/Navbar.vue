<template>
  <v-app-bar
  flat
  class="mynav"
  :class="{fullNav: fullMode}"
  >
    <div class="px-3"><h2 class="font-weight-light">Main dashboard</h2></div>
    <h2 class="font-weight-light">{{ user }}</h2>
    <v-btn primary @click="logout">Logout</v-btn>
  </v-app-bar>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Navbar',
  props: {
    fullMode: Boolean
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
  },
  computed: {
    ...mapGetters(['user'])
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

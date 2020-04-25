<template>
  <div>
    <v-app-bar
    flat
    class="mynav px-4"
    :class="{fullNav: fullMode}"
    >
      <div><h2 class="font-weight-light">Main dashboard</h2></div>
      <Battery :level="100" />
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
        {{username}}
      </v-btn>
    </v-app-bar>
    <v-divider></v-divider>
  </div>
</template>
<script>
import Battery from '@/components/appbar/Battery'
import { mapGetters } from 'vuex'
export default {
  name: 'Navbar',
  components: {
    Battery
  },
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
    ...mapGetters(['username'])
  }
}
</script>
<style scoped>
.mynav {
  height: 64px !important;
  background: transparent !important;
}
.fullNav {
  padding-left: 256px !important;
}
</style>

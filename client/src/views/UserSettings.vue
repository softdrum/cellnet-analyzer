<template>
  <v-container>
    <v-row>
      <v-col>
        <v-switch inset @change="changeTheme" v-model="switch1" :label="'Dark theme'"></v-switch>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'settings',
  data: () => ({
    switch1: null
  }),
  mounted() {
    this.switch1 = this.$vuetify.theme.dark
  },
  methods: {
    changeTheme() {
      this.$vuetify.theme.dark = this.switch1
      this.$store.dispatch('setTheme', this.switch1)
    }
  }
}
</script>

<template>
  <v-snackbar
    v-model="show"
    :color="color"
    top
    @click="show = false"
  >
    {{ message }}
    <v-btn
      color="white"
      icon
      small
      @click="snackbar = false"
    >
      <v-icon>
        mdi-close
      </v-icon>
    </v-btn>
  </v-snackbar>
</template>
<script>

export default {
  data: () => ({
    show: false,
    message: '',
    color: ''
  }),
  created: function () {
    this.$store.watch(state => state.snackMessage, () => {
      const msg = this.$store.state.snackMessage
      if (msg !== '') {
        this.show = true
        this.message = this.$store.state.snackMessage.message
        this.color = this.$store.state.snackMessage.color
        this.$store.commit('CLEAR_MESSAGE')
      }
    })
  }
}
</script>

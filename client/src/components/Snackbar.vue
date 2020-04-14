<template>
  <v-snackbar
        v-model="snackbar"
        :color="type"
        top
        @click="snackbar = false"
      >
        {{ message }}
        <v-btn
          color="pink"
          icon
          @click="snackbar = false"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-snackbar>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
  }),
  computed: {
    ...mapState({
      message: state => state.info.message,
      type: state => state.info.type
    }),
    snackbar: {
      get: function() {
        return this.message !== null
      },
      set: function(value) {
        this.$store.dispatch('clearMessage', value)
      }
    }
  },
  watch: {
    message() {
      this.snackbar = true
    }
  }
}
</script>

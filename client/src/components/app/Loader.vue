<template>
  <div>
    <v-overlay
      v-if="overlay"
      absolute color="primary"
    >
      <v-progress-circular indeterminate :size="size" ></v-progress-circular>
    </v-overlay>
    <div
      class="d-flex app-loader justify-center align-center"
      v-else
    >
      <v-progress-circular
        :size="size"
        color="primary"
        indeterminate
      >
      </v-progress-circular>
    </div>  
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    overlay: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 76
    }
  }
}
</script>
<style scoped>
  .app-loader {
    width: 100%;
    height: 90vh;
  }
</style>

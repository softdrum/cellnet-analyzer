<template>
  <v-card class="px-4 py-5 elevation-2">
    <div class="title-text px-3">{{ title }}</div>
    <loader
      v-if="loading"
      :overlay="true"
    />
    <slot />
  </v-card>
</template>

<script>
import Loader from '../app/Loader'
export default {
  name: 'ChartCard',
  props: {
    title: String,
    loading: Boolean
  },
  components: {
    Loader
  },
}
</script>

<style scoped>
  .title-text {
    font-size: 1rem !important;
    font-weight: normal;
  }
</style>

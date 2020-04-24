<template>
  <v-card class="pa-4 elevation-2">
    <div class="header text--black text--darken-4 px-3">{{ title }}</div>
    <Loader :overlay="true" v-if="loading" />
    <slot name="chart" />
  </v-card>
</template>
<script>
import Loader from '../app/Loader'
export default {
  components: {
    Loader
  },
  props: {
    title: String,
    loading: Boolean
  }
}
</script>

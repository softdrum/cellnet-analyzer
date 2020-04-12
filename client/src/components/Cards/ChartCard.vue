<template>
  <v-card class="pa-4 elevation-2">
    <div class="header text--black text--darken-4 px-3">{{ title }}</div>
    <slot name="chart" />
  </v-card>
</template>
<script>
export default {
  props: ['title']
}
</script>

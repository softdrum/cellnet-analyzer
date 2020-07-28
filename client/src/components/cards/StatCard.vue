<template>
  <v-card class="px-7 py-5">
    <div
      v-if="stat.title === 'No data'"
      class="d-flex justify-center align-center"  style="height: 100%"
    >
      <v-icon class="loading d-flex align-self-center" style="font-size: 4.1rem; color: #141926;">{{ stat.icon.name }}</v-icon>
    </div>
    <div v-else
      class="d-flex justify-space-between align-center"
      style="height: 100%"
    >
      <div class="text-left">
        <span class="font-weight-regular" style="font-size: 1rem; color: #616D83;">{{ stat.title }}</span>
        <br>
        <span class="font-weight-light" style="font-size: 1.8rem;">{{ stat.subtitle }}</span>
      </div>
      <v-icon :color="stat.icon.color" style="font-size: 4rem; color: #F67147">{{stat.icon.name}}</v-icon>
    </div>
    <!-- <v-divider></v-divider>
    <div class="d-flex mt-3">
      <v-icon class="align-self-center mr-1" style="font-size: 20px;">mdi-clock</v-icon>
      <span class="align-self-center ma-0 body-2 font-weight-light">Updated 5 minutes ago</span>
    </div> -->
  </v-card>
</template>
<script>
export default {
  props: {
    stat: {
      type: Object,
      default: () => ({
        title: 'No data'
      })
    },
  }
}
</script>

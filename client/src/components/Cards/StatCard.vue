<template>
  <v-card class="pa-4">
    <div class="d-flex justify-space-between">
      <v-icon class="align-self-start" :color="stat.icon.color" style="font-size: 4rem; color: #F67147">{{stat.icon.name}}</v-icon>
      <div class="text-right mb-4">
        <span class="font-weight-light body-1">{{ stat.title }}</span>
        <br>
        <span class="font-weight-light display-1">{{ stat.subtitle }}</span>
      </div>
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
  props: ['stat']
}
</script>

<template>
  <div class="d-flex align-center justify-space-between font-weight-regular" style="font-family: roboto;color: #404C5C; font-size: 1rem">
    <span class="text--secondary">Network:</span> 
    <v-menu
      transition="slide-y-transition"
      bottom
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          width="45"
          :loading="loading"
          v-bind="attrs"
          v-on="on"
          class="elevation-0 select-btn text--secondary"
        >
          {{ networkMode }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, i) of items"
          :key="i"
          @click="$emit('change-network-mode', item.title)"
        >
          <v-list-item-title> {{item.title}} </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
export default {
  data: () => ({
    loading: false,
    networkMode: 'LTE',
    items: [
      { title: 'LTE' },
      { title: '3G' },
      { title: 'GSM' },
      { title: 'AUTO' },
    ],
  })
}
</script>
<style scoped>
  .select-btn {
    font-family: roboto;
    background: transparent !important;
    font-size: 1rem;
    min-width: 10px
  }
</style>

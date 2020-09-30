<template>
  <div class="d-flex align-center justify-space-between font-weight-regular" style="font-family: roboto;color: #404C5C; font-size: 1rem">
    <span class="text--secondary">{{ title }}</span> 
    <v-menu
      v-if="title !== 'No service'"
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
          class="elevation-0 select-btn text--secondary subtitle-1 font-weight-regular"
        >
          {{ networkMode }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, i) of items"
          :key="i"
          @click="onChange(item.title)"
        >
          <v-list-item-title> {{item.title}} </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: () => ({
    loading: false,
    items: [
      { title: 'LTE' },
      { title: '3G' },
      { title: 'GSM' },
      { title: 'AUTO' },
    ],
  }),
  computed: {
    title () {
      if (this.networkMode.toLowerCase() === 'no service') return 'No service'
      else return 'Network:'
    },
    ...mapState({
      networkMode: state => state.modem.networkMode,
    }),
  },
  methods: {
    ...mapActions(['changeNetworkMode']),
    async onChange (mode) {
      this.loading = true;
      await this.changeNetworkMode(mode);
      this.loading = false;
    }
  }
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

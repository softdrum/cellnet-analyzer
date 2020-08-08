<template>
  <div class="d-flex align-center justify-space-between font-weight-regular" style="font-family: roboto;color: #404C5C; font-size: 1rem">
    Network: 
    <v-menu
      transition="slide-y-transition"
      bottom
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          :loading="loading"
          v-bind="attrs"
          v-on="on"
          class="elevation-0" style="font-family: roboto; background: transparent; color: #404C5C; font-size: 1rem"
        >
          {{ networkMode }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, i) of items"
          :key="i"
          @click="changeNetwork(item.title)"
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
  }),
  methods: {
    changeNetwork (network) {
      this.loading = true
      this.$socket.client.emit('changeMode', network, (response) => {
        if (response.msg === 'success') this.$success('Network mode successfully changed')
        else {
          if (response.msg === 'No service') this.networkMode = 'No service'
          this.$error(response.msg)
        }
        this.loading = false
      });
    }
  },
}
</script>

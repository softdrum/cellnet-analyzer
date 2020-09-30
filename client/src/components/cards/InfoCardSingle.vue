<template>
  <v-card class="px-8 py-6">
      <div
        v-if="info.value != -1"
        class="d-flex align-center justify-space-between"
        style="height: 100%"
      >
        <div>
          <h3 class="title-text text--secondary">{{ info.title }}</h3>
          <h2 class="info-text">{{ info.value }} {{ info.measure }}</h2>
        </div>
        <v-icon class="card-icon" :color="info.icon.color">{{info.icon.name}}</v-icon>
      </div>
      <div class="d-flex align-center justify-center" style="height: 100%" v-else>
        <v-icon class="card-icon loading">{{ info.icon.name }}</v-icon>
      </div>
  </v-card>
</template>

<script>
export default {
  name: 'InfoCardSingle',
  props: {
    info: {
      type: Object,
      default: () => ({
        title: 'No data'
      })
    },
  },
  model: {
    prop: 'info'
  },
  computed: {
    isSingleData () {
      return this.data.length === 1
    }
  }
}
</script>

<style scoped>
  .title-text {
    font-family: roboto;
    font-weight: normal;
    font-size: 1rem;
    line-height: 1rem;
    margin-bottom: 8px;
  }
  .info-text {
    font-family: roboto;
    font-weight: 300 !important;
    font-size: 1.8rem !important;
    line-height: 1.8rem !important;
    text-align: start;
  }
  .card-icon {
    font-size: 4rem !important;
  }
</style>

<template>
  <v-card class="px-8 py-6" style="height: 100%">
      <div class="d-flex align-center justify-space-between" style="height: 100%" v-if="data.length">
        <div>
          <div v-for="(item, i) in data" :class="{'mb-4': i !== data.length-1 && !isSingleData}" :key="i">
            <h3 class="title-text text--secondary">{{ item.title }}</h3>
            <h2 class="info-text" :class="{'single-title': isSingleData}">{{ item.value }} {{ item.measure }}</h2>
          </div>
        </div>
        <slot name="icon" />
      </div>
      <div class="d-flex align-center justify-space-between" style="height: 100%" v-else>
        <h3 class="title-text text--secondary">Loading data...</h3>
        <v-icon class="card-icon" :class="{loading: !data.length}" >{{noDataIcon}}</v-icon>
      </div>
  </v-card>
</template>

<script>
export default {
  name: 'BaseInfoCard',
  props: {
    data: {
      type: Array,
      default: () => ([])
    },
    noDataIcon: {
      type: String
    }
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
  .single-title {
    font-family: roboto;
    font-weight: 300 !important;
    font-size: 1.8rem !important;
    line-height: 1.8rem !important;
    text-align: start;
  }
  .info-text {
    font-family: roboto;
    font-weight: normal;
    font-size: 1.3rem;
    text-align: start;
    line-height: 1.3rem;
  }
  .card-icon-single-data {
    font-size: 4rem !important;
  }
  .card-icon {
    font-size: 7rem;
  }
</style>

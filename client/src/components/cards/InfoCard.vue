<template>
  <base-info-card :data="data" :no-data-icon="icon.name">
    <v-icon slot="icon" class="card-icon" :class="{loading: !data.length, 'card-icon-single-data': data.length < 2}" :color="icon.color">{{icon.name}}</v-icon>
    <div slot="no-data" class="d-flex align-center justify-space-between" >
      <h3 class="title-text text--secondary">Loading data...</h3>
    </div>
  </base-info-card>
</template>

<script>
import BaseInfoCard from '@/components/cards/BaseInfoCard'
export default {
  name: 'InfoCard',
  props: {
    data: {
      type: Array,
      default: () => ([])
    },
    icon: Object
  },
  components: {
    BaseInfoCard
  }
}
</script>
<style scoped>
  .card-icon-single-data {
    font-size: 4rem !important;
  }
  .card-icon {
    font-size: 7rem;
  }
</style>

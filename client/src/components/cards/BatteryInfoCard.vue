<template>
  <base-info-card :data="data"  :no-data-icon="'mdi-battery'">
    <battery-level-item slot="icon" v-model="data[0].value"/>
  </base-info-card>
</template>

<script>
import BaseInfoCard from '@/components/cards/BaseInfoCard'
import BatteryLevelItem from '@/components/telemetry/BatteryLevelItem'

export default {
  name: 'BatteryInfoCard',
  props: {
    data: {
      type: Array,
      default: () => ([])
    },
  },
  components: {
    BaseInfoCard,
    BatteryLevelItem,
  }
}
</script>

<style scoped>
  .title-text {
    font-family: roboto;
    font-weight: normal;
    font-size: 1rem;
    line-height: 1rem;
  }
  .info-text {
    font-family: roboto;
    font-weight: normal;
    font-size: 1.3rem;
    text-align: start;
    line-height: 1.3rem;
  }
  .card-icon {
    font-size: 7rem;
  }
</style>

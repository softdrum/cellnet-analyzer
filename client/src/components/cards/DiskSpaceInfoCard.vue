<template>
  <v-card class="px-8 py-6" style="height: 100%;">
    <div v-if="value" class="d-flex align-center justify-space-between" style="height: 100%">
      <v-icon class="card-icon mr-3" color="background">icon-drive</v-icon>
      <disk-space-item v-model="value"/>
    </div>
    <div v-else class="d-flex align-center justify-space-between" style="height: 100%">
      <h3 class="title-text text--secondary">Loading data...</h3>
      <v-icon class="card-icon" :class="{loading: !value}" >icon-drive</v-icon>
    </div>
  </v-card>
</template>

<script>
import DiskSpaceItem from '@/components/telemetry/DiskSpaceItem'


export default {
  name: 'DiskSpaceInfoCard',
  props: {
    value: {
      type: Object,
      default: () => ({

      })
    },
  },
  components: {
    DiskSpaceItem,
  }
}
</script>

<style scoped>
  .card-icon {
    font-size: 5rem;
  }
  .title-text {
    font-family: roboto;
    font-weight: normal;
    font-size: 1rem;
    line-height: 1rem;
    margin-bottom: 8px;
  }
</style>

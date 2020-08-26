<template>
  <v-card class="px-8 py-6" style="height: 100%;">
    <div class="d-flex align-center justify-space-between" style="height: 100%">
      <v-icon class="card-icon mr-3">icon-drive</v-icon>
      <disk-space-item v-model="value"/>
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
</style>

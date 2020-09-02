<template>
  <base-chart
    type="line"
    :refName="refName"
    :options="options"
    v-model="value"
    :data="data"
    @reset="$emit('reset')"
  />
</template>

<script>
import defaultOptions from '@/components/charts/options/default.chart'
import BaseChart from '@/components/charts/BaseChart'
export default {
  name: 'RealtimeChart',
  components: {
    BaseChart
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: null
    },
    color: {
      type: String,
      default: '#ff0'
    },
    refName: {
      type: String,
      default: 'chart',
    },
    bufferSize: {
      type: Number,
      default: 60
    }
  },
  data: () => ({
    options: {}
  }),
  computed: {
    darkTheme () {
      return this.$vuetify.theme.dark
    }
  },
  watch: {
    darkTheme: {
      immediate: true,
      handler (val) {
        this.options = defaultOptions.getOptions([this.color], val)
      }
    }
  }
}
</script>

<style>

</style>

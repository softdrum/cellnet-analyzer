<template>
    <apexchart
      :type="type" 
      :ref="refName" 
      :options="options" 
      :series="series"
      style="pointer-events: none;"
    />
</template>

<script>
export default {
  name: 'BaseChart',
  props: {
    type: {
      type: String,
      default: 'line'
    },
    refName: {
      type: String,
      default: 'chart',
    },
    options: {
      type: Object
    },
    data: {
      type: Array,
      default: () => []
    },
    series: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: null
    },
    bufferSize: {
      type: Number,
      default: 60
    }
  },
  data: () => ({
    chartData: [],
    timer: null
  }),
  mounted () {
    this.timer = setInterval(() => {
      let length = this.chartData.length
      if (length > 10) {
        this.chartData = this.chartData.slice(length - 10, length);
        this.$refs[this.refName].updateSeries([{
          data: this.chartData
        }])
      }
    }, 60000);
  },
  computed: {
    dataLength () {
      return this.data.length
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (newVal) {
        if (newVal) {
          this.chartData.push(newVal)
          if (this.value && this.$refs[this.refName]) {
            this.$refs[this.refName].updateSeries([{
              data: this.chartData
            }])
          }
        }
      }
    },
    dataLength: {
      immediate: true,
      handler () {
        if (this.data && this.$refs[this.refName]) {
          this.$refs[this.refName].updateSeries([{
            data: this.data
          }])
        }
      }
    },
  },
  destroyed () {
    this.chartData = [];
    clearInterval(this.timer)
  },
}
</script>

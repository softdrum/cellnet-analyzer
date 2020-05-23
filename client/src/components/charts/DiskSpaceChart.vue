<template>
  <div>
    <div class="back mr-3">
      <div class="inner-text d-flex align-center justify-center">
        <div>{{ used }} / {{ size }} GB</div>
      </div>
      <div class="top" :style="diskSpace">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    value: {
      type: Object
    }
  },
  data: () => ({
    diskUsed: 0
  }),
  computed: {
    diskSpace() {
      let from, to
      const usedPercentage = this.used / this.size * 100
      if (usedPercentage <= 50) {
        from = '#dce35b'
        to = '#45b649'
      }
      else if (usedPercentage <= 70) {
        from = '#ffb347'
        to = '#ffcc33'
      } else {
        from = '#e43a15'
        to = '#e65245'
      }
      return `width: ${usedPercentage}%; background: ${from};background: -webkit-linear-gradient(to top,  ${from},  ${to});background: linear-gradient(to top,  ${from},  ${to});`
    },
    used() {
      if (!this.value.free) return 0
      return ((this.value.size - this.value.free) / 1000**3).toFixed(1)*1
    },
    size() {
      if (!this.value.size) return 0
      return  (this.value.size / 1000**3).toFixed(1)
    }
  },
  watch: {
    value(val) {
      const free = val.free
      const size = this.value.size
      this.diskUsed= 100 - free / size * 100
    }
  },
}
</script>
<style scoped>
  .thermometer {
    min-width: 230px;
    min-height: 100px;
    height: 120px;
  }
  .inner-text {
    position: relative;
    z-index: 2;
    height: 100%;
  }
  .back {
    text-align: center;
    width: 300px;
    background: rgba(20, 25, 38, 0.7);
    height: 50px;
    border-radius: 10px;
    position: relative;
    z-index: 0;
    overflow: hidden;
    box-shadow: inset 0px 0px 10px rgba(0,0,0,0.3);
  }

  .top {
    position: absolute;
    border-radius: 0px;
    height: 100%;
    width: 0%;
    z-index: 1;
    bottom: 0;
    transition: height 0.3s ease;
    box-shadow: inset 0px 0px 10px rgba(0,0,0,0.4);
  }
</style>

<template>
  <div style="width: 100%">
    <div class="back card-content mr-3 inner-shadow">
      <div class="inner-text d-flex align-center justify-center">
        <span class="title-text text--white">{{ value.used }} / {{ value.size }} GB</span>
      </div>
      <div class="top" :style="diskSpace">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiskSpaceItem',
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
      const usedPercentage = this.value.used / this.value.size * 100
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
  .inner-text {
    position: relative;
    z-index: 2;
    height: 100%;
  }
  .back {
    text-align: center;
    width: 100%;
    height: 50px;
    border-radius: 5px;
    position: relative;
    z-index: 0;
    overflow: hidden;
  }
  .title-text {
    font-family: roboto;
    font-weight: normal;
    font-size: 1rem;
    line-height: 1rem;
  }
  .top {
    position: absolute;
    border-radius: 0px;
    height: 100%;
    width: 0%;
    z-index: 1;
    bottom: 0;
    transition: height 0.3s ease;
  }
</style>

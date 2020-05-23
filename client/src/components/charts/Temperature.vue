<template>
    <div class="thermometer d-flex justify-center">
      <div class="back mr-5">
        <div class="top" :style="temperatureLevel"></div>
      </div>
      <div>
        <span style="color: #404C5C;">Temperature:</span>
        <div class="font-weight-light" style="font-size: 32px">{{value}}°C</div>
      </div>
    </div>
</template>

<script>
// import ChartCard from '@/components/cards/ChartCard'

export default {
  components: {
    // ChartCard
  },
  props: {
    value: Number
  },
  computed: {
    temperatureLevel() {
      let from, to
      if (this.value <= 50) {
        from = '#dce35b'
        to = '#45b649'
      }
      else if (this.value <= 70) {
        from = '#ffb347'
        to = '#ffcc33'
      } else {
        from = '#e43a15'
        to = '#e65245'
      }
      return `height: ${this.value}%; background: ${from};background: -webkit-linear-gradient(to top,  ${from},  ${to});background: linear-gradient(to top,  ${from},  ${to});`
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
  .back {
    width: 20px;
    height: 100%;
    border-radius: 10px;
    position: relative;
    z-index: 0;
    overflow: hidden;
    background: rgba(20, 25, 38, 0.7);
    box-shadow: inset 0px 0px 10px rgba(0,0,0,0.3);
  }
  .top {
    position: absolute;
    border-radius: 0px;
    width: 100%;
    z-index: 1;
    bottom: 0;
    transition: height 0.3s ease;
  }
</style>

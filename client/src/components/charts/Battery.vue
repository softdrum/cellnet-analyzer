<template>
  <div class=" pa-4 d-flex justify-center align-center">
    <div class="d-flex flex-column justify-center align-center mr-2">
        <div class="plus">
          <div class="topEnd" :class="{fullbattery: full}">
          </div>
        </div>
      <div class="mr-0">
        <div class="back">
          <div class="top" :style="batteryLevel"></div>
        </div>
      </div>
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
  data: () => ({
    full: false,
    oldValue: 0,
    batteryLevel: ''
  }),
  watch: {
    value (val) {
      if (val > 95) {
        this.batteryLevel = this.calculateBatteryLevel()
        setTimeout(() => {
          this.full = true
        }, 300)
      } else {
        if (this.oldValue > 95) {
          this.full = false
          setTimeout(() => {
            this.batteryLevel = this.calculateBatteryLevel()
          }, 300)
        } else {
          this.batteryLevel = this.calculateBatteryLevel()
        }
      }
      this.oldValue = val
    }
  },
  methods: {
    calculateBatteryLevel() {
      let from, to, level
      if (this.value <= 20) {
        from = '#e43a15'
        to = '#e65245'
        level = this.value
      }
      else if (this.value <= 70) {
        from = '#ffb347'
        to = '#ffcc33'
        level = this.value
      } else {
        from = '#45b649'
        to = '#dce35b'
        level = this.value
        if (this.value >= 95) {
          level = 100
          to = '#45b649'
        }
      }
      return `height: ${level}%; background: ${from};background: -webkit-linear-gradient(to top,  ${from},  ${to});background: linear-gradient(to top,  ${from},  ${to});`
    }
  },
  mounted() {
  }
}
</script>
<style scoped>
  .battery {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .back {
    height: 110px;
    width: 65px;
    border-radius: 10px;
    background: rgba(20, 25, 38, 0.7);
    position: relative;
    z-index: 0;
    overflow: hidden;
    box-shadow: inset 0px 0px 10px rgba(0,0,0,0.3);
  }
  .plus {
    height: 5px;
    width: 30px;
    border-radius: 3px 3px 0px 0px;
    position: relative;
    z-index: 3;
    overflow: hidden;
    box-shadow: inset 0px 0px 10px rgba(0,0,0,0.3);
  }
  .topEnd {
    box-shadow: inset 0px 0px 10px rgba(0,0,0,0.3);
    position: absolute;
    border-radius: 0px;
    height: 0%;
    width: 100%;
    z-index: 1;
    bottom: 0;
    transition: all 0.3s ease;
  }
  .fullbattery {
    height: 100%;
    background: #45b649;
  }
  .value {
    text-align: center;
    font-size: 14px;
    width: 100%;    
    z-index: 3;
  }
  .top {
    box-shadow: inset 0px 0px 10px rgba(0,0,0,0.4);
    position: absolute;
    border-radius: 0px;
    height: 100%;
    width: 100%;
    z-index: 1;
    bottom: 0;
    transition: width 0.3s ease;
  }
  
</style>

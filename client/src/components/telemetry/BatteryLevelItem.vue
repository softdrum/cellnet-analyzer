<template>
  <div class="d-flex mr-1 justify-center align-center battery">
    <div class="d-flex flex-column justify-center align-center">
        <div class="plus card-content inner-shadow">
          <div class="topEnd inner-shadow" :class="{fullbattery: full}">
          </div>
        </div>
      <div class="mr-0">
        <div class="back card-content inner-shadow">
          <div class="top inner-shadow" :style="batteryLevel"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BatteryLevelItem',
  props: {
    value: Number
  },
  data: () => ({
    full: false,
    batteryLevel: '',
  }),
  watch: {
    value (newVal) {
      this.batteryLevel = this.calculateBatteryLevel(newVal)
    }
  },
  methods: {
    calculateBatteryLevel(value) {
      let from, to, level
      if (value > 90) {
        this.full = true
        level = 100
        from = '#45b649'
        to = from
      } else {
        this.full = false
         if (value <= 20) {
          from = '#e43a15'
          to = '#e65245'
          level = value
        }
        else if (value <= 70) {
          to = '#ffcc33'
          from = '#ffb347'
          level = value
        } else {
          from = '#dce35b'
          to = '#45b649'
          level = value
        }
      }
      return `height: ${level}%; background: ${from};background: -webkit-linear-gradient(to top,  ${from},  ${to});background: linear-gradient(to top,  ${from},  ${to});`
    }
  },
  mounted() {
     this.batteryLevel = this.calculateBatteryLevel(this.value);
  }
}
</script>

<style scoped>
  .battery {
    position: relative;
    width: 90px;
    height: 100%;
  }
  .back {
    height: 90px;
    width: 55px;
    border-radius: 10px;
    position: relative;
    z-index: 0;
    overflow: hidden;
  }
  .plus {
    height: 5px;
    width: 30px;
    border-radius: 3px 3px 0px 0px;
    position: relative;
    z-index: 3;
    overflow: hidden;
  }
  .topEnd {
    position: absolute;
    border-radius: 0px;
    height: 0%;
    width: 100%;
    z-index: 1;
    bottom: 0;
    transition: height 0.3s ease;
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
    position: absolute;
    border-radius: 0px;
    height: 100%;
    width: 100%;
    z-index: 1;
    bottom: 0;
    transition: height 0.1s ease;
  }
  
</style>

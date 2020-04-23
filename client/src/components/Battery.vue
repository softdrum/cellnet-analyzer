<template>
  <div class="battery">
  <div class="battery-level" :style="{width: level}"></div>
</div>
</template>
<script>
export default {
  props: {
    level: Number
  }
}
</script>
<style scoped>
.battery {
  border: 1px solid #f4f3ef;
  width: 28px;
  height: 15px;
  padding: 2px;
  border-radius: 4px;
  position: relative;
  margin: 15px 0;
}
.battery-level {
  background: red;  
  position: absolute;
  border-radius: 4px;
  height: 90%;
  bottom: 0px;
  left: 0;
  right: 0;
}
  .battery:before {
    content: '';
    height: 10px;
    width: 2px;
    background: #f4f3ef;
    display: block;
    position: absolute;
    right: -2px;
    top: 1px;
    border-radius: 4px 4px 0 0;
  }
</style>

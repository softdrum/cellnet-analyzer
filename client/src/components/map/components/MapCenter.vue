<template>
  <div @click="onClick">
    <slot />
  </div>
</template>

<script>
export default {
  name: "MapCenter",
  inject: ["map"],
  data: () => ({
    mapCenterPosition: null
  }),
  methods: {
    onClick () {
      this.mapCenterPosition = this.map.getCenter()
      this.$emit('clicked', this.mapCenterPosition)
    },
  }
};
</script>

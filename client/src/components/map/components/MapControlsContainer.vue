<template>
  <div
    class="controls-container"
    :style="`${positionNormalized.horizontal}: 10px; ${positionNormalized.vertical}: 10px`"
  >
    <div
      class=" d-flex flex-column justify-end"
      :class="`align-${positionNormalized.flexAlign}`"
    >
      <slot />
    </div>
  </div>
</template>

<script>

export default {
  name: "MapControlsContainer",
  props: {
    position: {
      type: String,
      default: "top-right"
    }
  },
  data: () => ({
    getPositionRegExp: /(?<vertical>\w+)-(?<horizontal>\w+)/
  }),
  computed: {
    positionNormalized () {
      let pos = this.position.match(this.getPositionRegExp)
      console.log(pos.groups)
      if ( pos ) {
        return {
          vertical: pos.groups.vertical,
          horizontal: pos.groups.horizontal,
          flexAlign: this.flexAlign(pos.groups.horizontal)
        }
      }
      else return {
        vertical: 'top',
        horizontal: 'right',
        flexAlign: 'end'
      }
    }
  },
  methods: {
    flexAlign (position) {
      switch (position) {
        case 'left': return 'start'
        default: return 'end'
      }
    }
  }
};
</script>

<style scoped>
  .controls-contaier {
    position: absolute;
  }
</style>

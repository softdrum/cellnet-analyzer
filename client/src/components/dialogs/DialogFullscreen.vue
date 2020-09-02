<template>
  <div>
    <v-dialog persistent v-model="value" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-btn @click="onClick">close</v-btn>
      <slot />
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'DialogFullscreen',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick () {
      this.$emit('close')
      this.$emit('input', false)
    }
  }
}
</script>

<template>
  <DialogAccept 
    :title="content.title"
    :text="content.text"
    :button="content.button"
    :acceptText="content.acceptText"
    :declineText="content.declineText"
    :cancelText="content.cancelText"
    v-model="value"
    @accept="onClick('accept')"
    @decline="onClick('decline')"
    @cancel="onClick('cancel')"
    @close="$emit('input', false)"
  />
</template>
<script>
import DialogAccept from './DialogAccept'
export default {
  name: 'DialogSaveData',
  components: {
    DialogAccept
  },
  props: {
    content: Object,
    value: {
      type: Boolean,
      default: false
    },
    button: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    onClick (eventName) {
      this.$emit(eventName)
    },
  },
}
</script>

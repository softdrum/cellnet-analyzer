<template>
  <dialog-accept 
    :button="content.button"
    :acceptText="content.acceptText"
    :declineText="content.declineText"
    :cancelText="content.cancelText"
    v-model="value"
  >
    <div slot="title">{{ title }}</div>
    <div v-if="!save">
      {{ content.text }}
    </div>
    <div v-else>
      <v-text-field
        label="Filename"
        type="filename"
        name="filename"
        v-model.trim="filename"
        @input="$v.filename.$touch()"
        @blur="$v.filename.$touch()"
        :error-messages="filenameErrors"
      />
    </div>
    <div slot="actions">
    <v-spacer></v-spacer>
      <v-btn
        color="primary"
        text
        @click="onAccept"
      >
        {{ confirmButtonText }}
      </v-btn>
      <v-btn
        v-if="!save"
        color="primary"
        text
        @click="onClick('decline')"
      >
        no
      </v-btn>
      <v-btn
        color="primary"
        text
        @click="onClose"
      >
        cancel
      </v-btn>
    </div>
  </dialog-accept>
</template>
<script>
import DialogAccept from './DialogAccept'
import { required, minLength } from 'vuelidate/lib/validators'
import dateFilter from '@/utils/filters/date.filter.js'
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
  validations: {
    filename: {required, minLength: minLength(5)}
  },
  data: () => ({
    save: false,
    filename: '',
  }),
  watch: {
    value (oldVal, newVal) {
      if (oldVal > newVal) {
        this.save = false
      }
    }
  },
  computed: {
    title () {
      if (this.save) return 'Input filename'
      else return this.content.title
    },
    confirmButtonText () {
      if (this.save) return 'save'
      else return this.content.acceptText
    },
    filenameErrors () {
      const errors = []
      if (!this.$v.filename.$dirty) return errors
      !this.$v.filename.minLength && errors.push('Minimal length is 5 characters!')
      !this.$v.filename.required && errors.push('Filename is required')
      return errors
    },
  },
  methods: {
    onClick (eventName) {
      this.$emit(eventName)
    },
    onClose () {
      this.save = false,
      this.$emit('input', false)
      this.$emit('close')
    },
    onAccept () {
      if (this.save) {
        if(this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        this.$emit('save', this.filename)
      }
      else {
        this.filename = dateFilter(new Date(), 'datetime', 'en-EN')
        this.save = true
      }
    }
  },
}
</script>

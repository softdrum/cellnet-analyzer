<template>
  <div class="text-center">
    <v-dialog
      v-model="value"
    >
    <v-card 
    >
      <v-form @submit.prevent="submitHandler"
          class="d-flex flex-column align-center"
      >
        <v-card-text>Edit file</v-card-text>
            <v-text-field
              type="text"
              name="filename"
              label="Filename"
              v-model.trim="filename"
              @input="$v.filename.$touch()"
              @blur="$v.filename.$touch()"
              :error-messages="filenameErrors"
            />
        <div class="d-flex flex-column align-center">
          <v-btn
            class="submit-btn mb-2"
            block type="submit"
            :loading="loading"
          >
            Save
          </v-btn>
        </div>
      </v-form>
    </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {required, minLength} from 'vuelidate/lib/validators'

  export default {
    name: 'CreateFileDialog',
    props: {
      file: Object,
      value: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      filename: null
    }),
    watch: {
      file () {
        this.filename = this.file.name
      }
    },
    validations: {
      filename: {required, minLength: minLength(5)},
    },
    computed: {
      filenameErrors () {
        const errors = []
        if (!this.$v.filename.$dirty) return errors
        !this.$v.filename.minLength && errors.push('Minimal length is 5 characters!')
        !this.$v.filename.required && errors.push('Filename is required')
        return errors
      },
    },
    methods: {
      submitHandler() {
        if(this.$v.$invalid) {
          this.$v.$touch()
          this.alert = true
          return
        }
        this.$emit('save', this.file._id, {name: this.filename})
        
      }
    },
  }
</script>
<style scoped>
  .submit-btn {
    width: 200px;
  }
</style>

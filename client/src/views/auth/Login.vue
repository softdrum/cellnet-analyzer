<template>
  <div>
    <v-container
        style="height: 100vh !important;"
        fluid
      >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          sm="12"
          md="8"
          lg="4"
        >
          <v-card 
            class="elevation-8 pa-10"
          >
            <v-form @submit.prevent="submitHandler"
               class="d-flex flex-column align-center"
            >
              <v-card-text class="display-1 text-center">Вход</v-card-text>
                <div class="shift">
                  <v-text-field
                    label="Email"
                    type="email"
                    name="email"
                    v-model.trim="email"
                    prepend-icon="mdi-account"  
                    color="#4E9F40"
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                    :error-messages="emailErrors"
                  />
                  <v-text-field
                    label="Password"
                    type="password"
                    name="password"
                    v-model.trim="password"
                    prepend-icon="mdi-lock"
                    color="#4E9F40"
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    :error-messages="passwordErrors"
                  />
                </div>
              <div class="d-flex flex-column align-center">
                <v-btn color="success" class="mb-2" width="200px" block type="submit">Войти</v-btn>
                <p><router-link  class="grey--text" to="/register">Зарегистрироваться</router-link></p>
              </div>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    
  </div>
</template>
<script>
import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: '',
    alert: false
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(5)}
  },
  computed: {
    passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.minLength && errors.push('Minimal length is 5 characters!')
        !this.$v.password.required && errors.push('Password is required')
        return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
  },
  methods: {
    async submitHandler() {
       if(this.$v.$invalid) {
        this.$v.$touch()
        this.alert = true
        return
      }
      try {
        const formData = {
          email: this.email,
          password: this.password
        }
        await this.$store.dispatch('login', formData)
        this.$success('Вы вошли в систему')
        this.$router.push('/')
      } catch (error) {
        this.$error('Не удалось войти в систему')
      }
    }
  }
}
</script>
<style  >
  .shift {
    margin-left: -20px;
  }
  .submitBtn {
    background: turquoise !important;
  }
</style>

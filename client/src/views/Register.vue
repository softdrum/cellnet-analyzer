<template>
  <div>
    <v-container
        style="height: 100vh !important;"
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
              <v-card-text class="display-1 text-center">Регистрация</v-card-text>
                <div class="shift">
                  <v-text-field
                    label="Email"
                    type="email"
                    name="email"
                    :rules="rules"
                    v-model.trim="email"
                    prepend-icon="mdi-account"  
                    color="#4E9F40"
                  />
                  <v-text-field
                    label="Password"
                    type="password"
                    name="password"
                    v-model.trim="password"
                    prepend-icon="mdi-lock"
                    color="#4E9F40"
                  />
                </div>
              <div class="d-flex flex-column align-center">
                <v-btn color="success" class="mb-2" width="200px" block type="submit">Зарегистрироваться</v-btn>
                <p><router-link  class="grey--text" to="/Login">Уже зарегистрированы?</router-link></p>
              </div>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    
  </div>
</template>
<script>
export default {
  name: 'register',
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    async submitHandler() {
      try {
        const formData = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

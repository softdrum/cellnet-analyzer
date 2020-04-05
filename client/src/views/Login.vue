<template>
  <div>
    <form @submit.prevent="submitHandler">
      <div>
          <span>Вход</span>
          <div>
            <v-text-field label="Email"
              type="email"
              :rules="rules"
              v-model.trim="email"
            />
          </div>
          <div>
            <v-text-field label="Passord"
              type="password"
              v-model.trim="password"
            />
          </div>
      </div>
      <div>
        <v-btn type="submit">Войти</v-btn>
        <p><router-link to="/register">Зарегистрироваться</router-link></p>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'login',
  data: () => ({
    email: 'user@mail.ru',
    password: '12345',
    rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ]
  }),
  methods: {
    async submitHandler() {
      try {
        const formData = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

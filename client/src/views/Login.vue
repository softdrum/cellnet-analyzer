<template>
  <div>
    <form @submit.prevent="submitHandler">
      <div>
          <span>Вход</span>
          <div>
            <input
              id="email"
              type="email"
              v-model.trim="email"
            >
            <label for="email">Email</label>
            <small></small>
          </div>
          <div>
            <input
              id="password"
              type="password"
              v-model.trim="password"
            >
            <label for="password">Password</label>
            <small></small>
          </div>
      </div>
      <div>
        <button type="submit">Войти</button>
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
    password: '12345'
  }),
  methods: {
    async submitHandler() {
      try {
        const formData = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('login', formData)
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

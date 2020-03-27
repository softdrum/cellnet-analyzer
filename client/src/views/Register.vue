<template>
  <div>
    <form @submit.prevent="submitHandler">
      <div>
          <span>Регистрация</span>
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
        <button type="submit">Зарегистрироваться</button>
      </div>
    </form>
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

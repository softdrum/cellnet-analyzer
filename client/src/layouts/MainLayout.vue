<template>
    <div>
        Main
        <p v-if="this.$store.state.auth.userLoggedIn">Залогинен</p>
        {{this.$store.state.auth.user}}
        <h1>Signal level: {{ this.$store.state.modem.signalLevel }}</h1>
        <button
          v-if="this.$store.state.auth.userLoggedIn"
          @click="logout"
        >
          Log out
        </button>
    </div>
</template>
<script>
export default {
  name: 'main',
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
    getData() {
      this.$store.dispatch('getData')
    }
  },
  mounted() {
    setInterval(() => {
      this.getData()
    }, 1000);
  }
}
</script>

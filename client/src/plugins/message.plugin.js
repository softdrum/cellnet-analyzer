export default {
  install(Vue) {
    Vue.prototype.$message = function({message, type}) {
      this.$store.dispatch('setMessage', {
        message,
        type
      })
    }
    Vue.prototype.$success = function(message) {
      this.$store.dispatch('setMessage', {
        message: message,
        type: 'success'
      })
    }
    Vue.prototype.$error = function(message) {
      this.$store.dispatch('setMessage', {
        message: message,
        type: 'red'
      })
    }
  }
}

export default {
  install(Vue) {
    Vue.prototype.$message = function({message, color}) {
      this.$store.dispatch('setMessage', {
        message: message,
        color: color
      })
    }
    Vue.prototype.$success = function(message) {
      this.$store.dispatch('setMessage', {
        message: message,
        color: 'success'
      })
    }
    Vue.prototype.$error = function(message) {
      this.$store.dispatch('setMessage', {
        message: message,
        color: 'red'
      })
    }
  }
}

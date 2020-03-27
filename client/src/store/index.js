import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import persistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [persistedState()],
  state: {},
  mutations: {},
  actions: {
  },
  modules: {
    auth
  }
})

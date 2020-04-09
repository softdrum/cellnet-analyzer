import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import modem from './modem'
import persistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [persistedState()],
  state: {
    darkTheme: true
  },
  mutations: {
    SET_THEME(state, value) {
      state.darkTheme = value
    }
  },
  actions: {
    setTheme({commit}, value) {
      commit('SET_THEME', value)
    }
  },
  modules: {
    auth,
    modem
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import modules from './modules';

Vue.use(Vuex)


export default new Vuex.Store({
  plugins: [persistedState()],
  state: {
    darkTheme: true,
    snackMessage: ''
  },
  mutations: {
    SET_THEME(state, value) {
      state.darkTheme = value
    },
    SET_MESSAGE(state, message) {
      state.snackMessage = message
    },
    CLEAR_MESSAGE(state) {
      state.snackMessage = ''
    }
  },
  actions: {
    setTheme({commit}, value) {
      commit('SET_THEME', value)
    },
    setMessage({commit}, message) {
      commit('SET_MESSAGE', message)
    }
  },
  getters: {
    message: s => s.snackMessage
  },
  modules
})

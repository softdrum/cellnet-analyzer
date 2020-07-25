import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import modem from './modem'
import map from './map'
import database from './database'
import persistedState from 'vuex-persistedstate'
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
  modules: {
    auth,
    modem,
    map,
    database
  }
})

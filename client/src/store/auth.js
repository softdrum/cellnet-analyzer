import authService from '../services/authService'
export default {
  state: {
    token: null,
    user: null,
    userLoggedIn: false
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
      if (token) {
        state.userLoggedIn = true
      } else {
        state.userLoggedIn = false
      }
    },
    SET_USER (state, user) {
      state.user = user
    }
  },
  actions: {
    async login({commit}, {email, password}) {
        const response = await authService.login({
          email: email,
          password: password
        })
        commit('SET_TOKEN', response.data.token)
        commit('SET_USER', response.data.user)
    },
    async register({commit}, {email, password}) {
        const response = await authService.register({
          email: email,
          password: password
        })
        commit('SET_TOKEN', response.data.token)
        commit('SET_USER', response.data.user)
    }
  }
}

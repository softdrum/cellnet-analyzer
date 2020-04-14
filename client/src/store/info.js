export default {
  state: {
    message: null,
    type: null
  },
  mutations: {
    SET_MESSAGE(state, { message, type }) {
      state.message = message
      state.type = type
    }
  },
  actions: {
    setMessage({commit}, info) {
      commit('SET_MESSAGE', info)
    },
    clearMessage({commit}, value) {
      if (!value) {
        commit('SET_MESSAGE', {
          message: null,
          type: null
        })
      }
    }
  }
}

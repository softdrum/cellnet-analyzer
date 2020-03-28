import modemService from '../services/modemService'
export default {
  state: {
    signalLevel: 0
  },
  mutations: {
    SET_SIGNAL_LEVEL(state, data) {
      if (data) {
        state.signalLevel = data.data
      } else {
        state.signalLevel = 0
      }
    }
  },
  actions: {
    async getData({commit}) {
        const response = await modemService.getData()
        commit('SET_SIGNAL_LEVEL', response.data)
    }
  }
}

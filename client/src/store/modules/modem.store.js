import socketService from '@/services/socketService'
export default {
  state: {
    connected: false,
    networkMode: 'auto',
    signalLevel: 0,
    bitErrorRate: 0,
    measureModeState: 'stopped'
  },
  mutations: {
    SET_SIGNAL_LEVEL (state , value) {
      state.signalLevel = value
    },
    SET_BIT_ERROR_RATE (state , value) {
      state.bitErrorRate = value
    },
    SET_MODEM_CONNECTION_STATUS(state, value) {
      state.connected = value
    },
    SET_MODEM_NETWORK_MODE(state, value) {
      state.networkMode = value
    },
    SET_MEASURE_MODE_STATE(state, value) {
      state.measureModeState = value
    },
  },
  actions: {
    async changeNetworkMode ({ commit }, mode) {
      try {
        let result = await socketService.emit(this._vm.$socket, 'changeMode', mode)
        commit('SET_MODEM_NETWORK_MODE', result)
      } catch (error) {
        console.log(error);
        commit('SET_ERROR', error)
      }
    },
    async getMeasureData({commit}) {
      try {
        const result = await socketService.emit(this._vm.$socket, 'getMeasureData')
        return result
      } catch (error) {
        commit('SET_ERROR', error)
      }
    },
    setMeasureModeState ({ commit }, value) {
      commit('SET_MEASURE_MODE_STATE', value)
    },
    socket_signalQuality ({ commit }, data) {
      commit('SET_SIGNAL_LEVEL', data.s_lvl)
      commit('SET_BIT_ERROR_RATE', data.ber)
    },
    socket_modemError({commit}, error) {
      commit('SET_MESSAGE', {message: error.data, color:'red'})
      commit('SET_MODEM_CONNECTION_STATUS', false)
    },
    socket_modemConnected({commit}, error) {
      commit('SET_MESSAGE', {message: error.data, color:'success'})
      commit('SET_MODEM_CONNECTION_STATUS', true)
    }
  }
}

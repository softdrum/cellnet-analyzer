import socketService from '@/services/socketService'
export default {
  state: {
    connected: false,
    basestationInfo: null,
    networkMode: 'auto',
    measureModeState: 'stopped'
  },
  mutations: {
    SET_BASESTATION (state, value) {
      state.networkMode = value.mode
      state.basestationInfo = value
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
        await socketService.emit(this._vm.$socket, 'changeMode', mode)
      } catch (error) {
        commit('SET_ERROR', error)
      }
    },
    async getGeoLocation ({ commit }) {
      try {
        let response = await socketService.emit(this._vm.$socket, 'getGeoLocation')
        return response
      } catch (error) {
        commit('SET_ERROR', error)
      }
    },
    async getAvailableOperators ({ commit }) {
      try {
        let response = await socketService.emit(this._vm.$socket, 'getAvailableOperators')
        return response
      } catch (error) {
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
      commit('SET_BASESTATION', value)
      commit('SET_MEASURE_MODE_STATE', value)
    },
    socket_modemInfo ({ commit }, data) {
      commit('SET_BASESTATION', data.bs)
    },
    socket_modemError({commit}, error) {
      console.log(error);
      commit('SET_MESSAGE', {message: error.data, color:'red'})
      commit('SET_MODEM_CONNECTION_STATUS', false)
    },
    socket_modemConnected({commit}) {
      commit('SET_MODEM_CONNECTION_STATUS', true)
    }
  }
}

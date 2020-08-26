export default {
  state: {
    connected: false,
    signalLevel: 0,
    bitErrorRate: 0,
  },
  mutations: {
    SET_SIGNAL_LEVEL (state , value) {
      state.signalLevel = value
      console.log(value);
    },
    SET_BIT_ERROR_RATE (state , value) {
      state.bitErrorRate = value
    },
    SET_MODEM_CONNECTION_STATUS(state, value) {
      state.connected = value
    },
  },
  actions: {
    getMeasureData({commit}, socket) {
      return new Promise ((resolve, reject) => {
        socket.client.emit('getMeasureData', response => {
          if (response.status === 'ERROR') reject({s_lvl: 31, ber: 1})
          else {
            resolve(response.data)
            commit('SET_SIGNAL_LVL', response.data)
          }
        });
      })
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

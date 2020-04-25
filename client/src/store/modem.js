export default {
  state: {
    signal_level: {
      value: 22 ,
      last_update: 22
    },
    bit_error_rate: {
      value: 0,
      last_update: null
    },
    snr: {
      value: 0,
      last_update: null
    }
  },
  mutations: {
    SET_SIGNAL_LVL(state, value) {
      state.signal_level = {
        value: value,
        last_update: new Date()
      }
    },
    SET_BER(state, value) {
      state.bit_error_rate = {
        value: value,
        last_update: new Date()
      }
    },
    SET_SNR(state, value) {
      state.snr = {
        value: value,
        last_update: new Date()
      }
    },
  },
  actions: {
    setSignalLevel({commit}, value) {
      commit('SET_SIGNAL_LVL', value)
    },
    setBitErrorRate({commit}, value) {
      commit('SET_BER', value)
    },
    setSNR({commit}, value) {
      commit('SET_SNR', value)
    },
  }
}

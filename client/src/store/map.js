export default {
  state: {
    mapInstance: null,
  },
  mutations: {
    SET_MAP(state, mapObject) {
      state.mapInstance = mapObject
    },
    
  },
  actions: {
    setMap({commit}, mapObject) {
      commit('SET_MAP', mapObject)
    }
  }
}

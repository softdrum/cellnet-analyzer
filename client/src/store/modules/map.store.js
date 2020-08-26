// import geojsonService from '../services/geojsonService'


// export default {
//   state: {
//     basestations: [],
//     mapCenter: null,
//   },
//   mutations: {
//     SET_BASESTATIONS(state, data) {
//       state.basestations = data
//     },
//     SET_MAP_CENTER(state, coordinates) {
//       state.mapCenter = coordinates
//     }
//   },
//   actions: {
//     async getBasestations({commit}) {
//       const data = (await geojsonService.readGeoJSON('saint_petersburg_cells')).data
//       commit('SET_BASESTATIONS', data)
//     },
//     setMapCenter({commit}, coordinates) {
//       commit('SET_MAP_CENTER', coordinates)
//     }
//   }
// }

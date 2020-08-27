import api from './api'
export default {
  getBasestations (query) {
    return api().get(`basestation/${query}`)
  },
}

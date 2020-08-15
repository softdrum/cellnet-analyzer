import api from '../services/api'
export default {
  createDocument (collectionName, data) {
    return api().post(`database/${collectionName}`, data)
  },
  readCollection (collectionName, query) {
    return api().get(`database/${collectionName}${query}`)
  },
  updateDocument (collectionName, documentId) {
    return api().put(`database/${collectionName}/${documentId}`)
  },
  deleteDocument (collectionName, documentId) {
    return api().delete(`database/${collectionName}/${documentId}`)
  },
}

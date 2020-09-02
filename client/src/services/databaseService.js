import api from '../services/api'
export default {
  createDocument (collectionName, data) {
    return api().post(`database/${collectionName}`, data)
  },
  readCollection (collectionName, query) {
    return api().get(`database/${collectionName}${query}`)
  },
  readDocument (collectionName, documentId) {
    return api().get(`database/${collectionName}/${documentId}`)
  },
  findLatestDocument (collectionName, query) {
    return api().get(`database/${collectionName}/latest${query}`)
  },
  updateDocument (collectionName, documentId, update) {
    return api().put(`database/${collectionName}/${documentId}`, update)
  },
  deleteDocument (collectionName, documentId) {
    return api().delete(`database/${collectionName}/${documentId}`)
  },
}

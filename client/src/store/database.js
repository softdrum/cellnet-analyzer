import databaseService from '../services/databaseService'
export default {
  actions: {
    async getDataFromDatabase() {
      const response = await databaseService.getData()
      return Object.keys(response.data.data)
    }
  }
}

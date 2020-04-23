import databaseService from '../services/databaseService'
export default {
  actions: {
    async removeDataFromDatabase({commit},{tableName, selected}) {
      const response = await databaseService.removeData({
        tableName: tableName,
        selected: selected
      })
      commit('SET_MESSAGE', {message: 'Удалено', color:'success'})
      return response
  },
    async getDataFromDatabase(tableName) {
      const response = await (await databaseService.getData(tableName)).data.data
      return response
    }
  }
}

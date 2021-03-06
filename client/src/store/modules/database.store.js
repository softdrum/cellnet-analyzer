import databaseService from '../../services/databaseService'
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
    async saveGeoJSON ({commit}, data) {
      await databaseService.saveGeoJSON(data)
      commit('');
    },
    async getGeoJSONSlice ({commit}, {coordinates, radius}) {
      const response = (await databaseService.getGeoJSONData({coordinates, radius})).data;
      commit('');
      return response
    },
    async saveBS ({commit}, geodata) {
      await databaseService.createDocument('Basestation',geodata)
      const response = 'OK'
      commit('')
      return response
    },
    async getDataFromDatabase({commit}, tableName) {
      const response = (await databaseService.getData(tableName)).data.data
      commit('')
      return response
    },
    async addDataInDatabase({commit}, {tableName, data}) {
      const response = await databaseService.addData(tableName, data)
      commit('')
      return response
    }
  }
}

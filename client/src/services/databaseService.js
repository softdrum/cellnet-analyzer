import api from '../services/api'
export default {
    addData (tableName, data) {
      return api().post('addData', {tableName, data})
    },
    getData (tableName) {
      return api().post('getData', {tableName})
    },
    removeData ({tableName, selected}) {
      return api().post('remove', {tableName, selected})
    }
}

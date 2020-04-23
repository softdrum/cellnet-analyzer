import api from '../services/api'
export default {
    getData (tableName) {
        return api().post('getData', {tableName})
    },
    removeData ({tableName, selected}) {
        return api().post('remove', {tableName, selected})
    }
}

import api from '../services/api'
export default {
    getData () {
        return api().get('signal')
    }
}

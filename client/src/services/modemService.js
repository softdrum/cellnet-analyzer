import api from '../services/api'
const config = {
}
export default {
    getData () {
        return api().get('data', config)
    }
}

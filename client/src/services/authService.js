import api from '../services/api'
const config = {
}
export default {
    register (credentials) {
        return api().post('register', credentials, config)
    },
    login (credentials) {
        return api().post('login', credentials, config)
    }
}

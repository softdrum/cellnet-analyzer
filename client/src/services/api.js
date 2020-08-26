import axios from 'axios'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
export default () => {
    return axios.create({
        baseURL: 'http://192.168.0.103:8081/api/'
    }) 
}

import axios from 'axios'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
export default () => {
    return axios.create({
        baseURL: 'http://localhost:8082/api/'
    }) 
}

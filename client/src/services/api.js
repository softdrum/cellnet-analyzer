import axios from 'axios'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
const apiURL = `http://http://192.168.0.102:8082`;

export default () => {
    return axios.create({
        baseURL: apiURL
    }) 
}

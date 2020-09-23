import axios from 'axios'
const apiURL = process.env.VUE_APP_DB_API_URL || `http://localhost:8081/api`;

export default () => {
    return axios.create({
        baseURL: apiURL
    }) 
}

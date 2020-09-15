import axios from 'axios'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
const apiURL = `http://${process.env.DB_API_HOST}:${process.env.DB_API_PORT}`;

export default () => {
    return axios.create({
        baseURL: apiURL
    }) 
}

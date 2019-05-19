import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: `http://47.103.96.205:9000/api/`
    })
}
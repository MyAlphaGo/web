import base from './base'
import axios from '../util/axios'
export default {
    getTime() {
        return new Promise((resolve, reject) => {
            axios.get(`${base.getTime}`).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    login(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.login}`, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    }
}
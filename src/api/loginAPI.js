import jwtDecode from 'jwt-decode'

import axios from '../axios/axios'
import { setCookie } from '../util/cookie'

export const emailDoubleCheck = async (email) => {
    const test = 'test@test.com'
    try {
        // const res = await axios.get('/user/idCheck', email)
    } catch (err) {
        console.log(err)
    }
    return test === email
}

export const signup = async (data) => {
    let result = null
    try {
        const res = await axios.post('/signup', data)
        result = true
    } catch(err) {
        result = false
    }
    return result
}

export const login = async (data) => {
    let result = null
    try {
        const res = await axios.post('/login', data)
        console.log(jwtDecode(res.data.accessToken))
        console.log(new Date(jwtDecode(res.data.accessToken).exp).toLocaleString("ko-KR"))
        // setCookie('jwt', res.data.accessToken)
        result = true
    } catch (err) {
        result = false
    }
    return result
}

export const getUserInfo = async () => {
    try {
        const res = await axios.get('/users')
        return res.data
    } catch (err) {
        console.log(err)
    }
}
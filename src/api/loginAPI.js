import jwtDecode from 'jwt-decode'

import axios from '../axios/axios'
import { getCookie, setCookie } from '../util/cookie'

export const emailDoubleCheck = async (email) => {
    let answer = true
    try {
        const res = await axios.get(`/user/idCheck/`, {
            params: { email }
        })
        answer = !res.data.result
    } catch (err) {
        answer = !err.response.data.result
    }
    return answer
}

export const signup = async (data) => {
    let answer = {result: null}
    try {
        const res = await axios.post('/user/signup', data)
        answer.result = res.data.result
    } catch(err) {
        answer.result = err.response.data.result
    }
    return answer
}

export const login = async (data) => {
    let answer = {
        result: null,
        accessToken: null,
    }
    try {
        const res = await axios.post('/user/login', data)
        const tokens = res.data.data
        setCookie('refreshToken', tokens.refreshToken, {
            expires: new Date((jwtDecode(tokens.refreshToken).exp) * 1000),
         })
        answer.accessToken = tokens.accessToken
        answer.result = res.data.result
    } catch (err) {
        answer.result = err.response.data.result
    }
    return answer
}

export const logout = async () => {
    let answer = { result: null }
    try {
        const res = await axios.post('/user/logout', {'refreshToken': getCookie('refreshToken')})
        answer.result = res.data.result
    } catch (err) {
        answer.result = err.response.data.result
    }
    return answer
}

export const getUserInfo = async () => {
    try {
        const res = await axios.get('/users')
        // return res.data
    } catch (err) {

    }
}
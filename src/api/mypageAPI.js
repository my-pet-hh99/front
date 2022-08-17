import axios from '../axios/axios'

// 에러쪽 구현 미비
export const getUserInfo = async () => {
    try {
        const res = await axios.get('/user/me')
        return res.data.data
    } catch (err) {
        console.log(err)
    }
}

export const checkPassword = async (password) => {
    let answer = {result: null}
    try {
        const res = await axios.get('/user/pwCheck', {
            params: { password }
        })
        answer.result = res.data.result
    } catch (err) {
        answer.result = err.response.data.result
        answer.message = err.response.data.message
    }
    return answer
}

// 구현 안됨
export const modifyUserInfo = async (data) => {
    try {
        const res = await axios.put('/user/me', data)
        console.log(res)
    } catch (err) {
        console.log(err)
    }
}

export const deleteUser = async (password) => {
    let answer = {result: null}
    try {
        const res = await axios.delete('/user/me', {
            data: { password }
        })
        answer.result = res.data.result
    } catch (err) {
        answer.result = err.response.data.result
        answer.message = err.response.data.message
    }
    return answer
}
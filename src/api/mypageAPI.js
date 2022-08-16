import axios from '../axios/axios'

export const getUserInfo = async () => {
    try {
        const res = await axios.get('/user/me')
        return res.data.data
    } catch (err) {
        console.log(err)
    }
}

export const checkPassword = async (password) => {
    try {
        const res = await axios.get('/user/pwCheck', {
            params: { password }
        })
        console.log(res)
    } catch (err) {
        console.log(err)
    }
}

export const modifyUserInfo = async (data) => {
    try {
        const res = await axios.put('/user/edit', data)
        console.log(res)
    } catch (err) {
        console.log(err)
    }
}
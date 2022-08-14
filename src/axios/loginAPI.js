import axios,{fileAxios} from './axios'

export const signup = async (data) => {
    // 백엔드 합칠때 수정필요
    // try {
    //     const res = await axios.post('/signup', data)
    //     console.log(res)
    // } catch(err) {
    //     console.log(err)
    //     alert(err.message)
    // }
    console.log(data)
}

export const login = async (data) => {
    console.log(data)
}

export const emailDoubleCheck = async (email) => {
    const test = 'test@test.com'
    try {
        // const res = await axios.post('/signup', email)
    } catch(err) {
        console.log(err)
    }
    return test === email
}
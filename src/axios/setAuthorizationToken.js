import instance from './axios'

const setAuthorizationToken = (accessToken) => {
    if(accessToken) {
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
    } else {
        delete instance.defaults.headers.common['Authorization']
    }
}

export default setAuthorizationToken
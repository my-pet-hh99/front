import { configureStore } from '@reduxjs/toolkit'
import user from './modules/user'
import posts from './modules/posts'

const store = configureStore({
    reducer : { 
        user,
        posts
    },
    devTools: false
})

export default store
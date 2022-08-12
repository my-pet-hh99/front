import {Route, Routes} from 'react-router-dom'

import Main from '../view/Main'
import Detail from '../view/Detail'
import LoginForm from '../view/LoginForm'

const Router = () => {
    return(
        <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/detail' element={<Detail/>}/>
            <Route path='/login' element={<LoginForm/>}/>
            <Route path='/signup' element={<LoginForm/>}/>
        </Routes>
    )
}

export default Router
import {Route, Routes} from 'react-router-dom'

import Main from '../view/Main'
import Detail from '../view/Detail'
import SignUp from '../view/SignUp'

const Router = () => {
    return(
        <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/detail' element={<Detail/>}/>
            <Route path='/signup' element={<SignUp/>}/>
        </Routes>
    )
}

export default Router
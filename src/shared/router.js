import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Navigate, Route, Routes} from 'react-router-dom'

import Main from '../view/Main'
import Detail from '../view/Detail'
import LoginForm from '../view/LoginForm'
import MyPage from '../view/MyPage'

import { onSilentRefresh } from "../redux/modules/user";
import setAuthorizationToken from "../axios/setAuthorizationToken";

const Router = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    useEffect(() => {
      dispatch(onSilentRefresh())
      setAuthorizationToken(user.accessToken)
    })
    return(
        <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/detail' element={<Detail/>}/>
            <Route path='/login' element={user.loginUser ? <Navigate to="/"/> : <LoginForm/>}/>
            <Route path='/signup' element={user.loginUser ? <Navigate to="/"/> : <LoginForm/>}/>
            <Route path='/mypage' element={user.loginUser ? <MyPage/> : <Navigate to="/"/>}/>
            <Route path='/*' element={<Navigate to="/"/>}/>
        </Routes>
    )
}

export default Router
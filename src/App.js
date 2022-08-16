import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Router from "./shared/Router";
import { DELETE_TOKEN, onSilentRefresh } from "./redux/modules/user";
import setAuthorizationToken from "./axios/setAuthorizationToken";
import { removeCookie } from "./util/cookie";
import { logout } from "./api/loginAPI";

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const accessToken = useSelector(state => state.user.accessToken)
  useEffect(() => {
    dispatch(onSilentRefresh())
    setAuthorizationToken(accessToken)
  })

  const logoutHandler = () => {
    logout()
    .then(answer => {
      if(answer) {
        dispatch(DELETE_TOKEN())
        removeCookie('refreshToken')
        navigate('/')
      }
    })
  }
  return (
    <div>
      <button onClick={logoutHandler}>로그아웃</button>
      <Router/>
    </div>
  );
}

export default App;

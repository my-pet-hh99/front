import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Router from "./shared/router";
import { onSilentRefresh } from "./redux/modules/user";
import setAuthorizationToken from "./axios/setAuthorizationToken";

function App() {
  const dispatch = useDispatch()
  const accessToken = useSelector(state => state.user.accessToken)
  useEffect(() => {
    dispatch(onSilentRefresh())
    setAuthorizationToken(accessToken)
  })
  
  return (
    <div>
      <Router/>
    </div>
  );
}

export default App;

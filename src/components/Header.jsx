import React from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
//assets
import logo from '../src_assets/logo.png'
import { logout } from "../api/loginAPI";
import { useDispatch, useSelector } from "react-redux";
import { removeCookie } from "../util/cookie";
import { DELETE_TOKEN } from "../redux/modules/user";

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const getUser = useSelector(state => state.user.loginUser)
  const [user, setUser] = useState(getUser)

  // 로그아웃용
  const logoutHandler = () => {
    logout()
    .then(answer => {
      if(answer) {
        dispatch(DELETE_TOKEN())
        removeCookie('refreshToken')
        window.location.reload()
      }
    })
  }
  return (
    <StHeader>
      <StHeaderlogo onClick={() => navigate("/")}/>
      <StNavContainer>
        <StNavUl>
          <StNavLi onClick={() => 
              navigate(user ? "/mypage" : "/signup")
            }>
            <div>{user ? '마이페이지' : '회원가입'}</div>
          </StNavLi>
          <StNavLi onClick={() => {
              user ? logoutHandler() : navigate("/login")
            }}>
            <div>{user ? '로그아웃' : '로그인'}</div>
          </StNavLi>
        </StNavUl>
      </StNavContainer>
    </StHeader>
  )
}

export default Header

const StHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 800px;
  padding: 15px 0px;
`

const StHeaderlogo = styled.div`
  background-image: url(${logo});
  background-position: center;
  background-size: cover;
  width: 120px;
  height: 120px;
  cursor: pointer;
`

const StNavContainer = styled.nav`
color: #262626;
`

const StNavUl = styled.ul`
  display: flex;
  list-style: none;
`

const StNavLi = styled.li`
  font-size: 17px;
  padding: 10px 20px;
  cursor: pointer;
  &:hover{
    font-weight: bold;
    color: #fc93a5;
  }
`



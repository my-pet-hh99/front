import React from "react";
import { useState } from "react";
import styled from "styled-components";
import logo from '../../src_assets/logo.png'

const PostCard = () => {
  return(
    <StPostCard>
      <StPostCardHead>
        <h3>집사</h3>
        <p>8월 13일</p>
      </StPostCardHead>
      <StPostImage src={logo} alt='이미지를 불러올 수 없습니다'/>
      <StPostText>
        내용이 들어갑니다.
        내용이 들어갑니다.
        내용이 들어갑니다.
        내용이 들어갑니다.
        내용이 들어갑니다.
        내용이 들어갑니다.
        내용이 들어갑니다.
        내용이 들어갑니다.
      </StPostText>
    </StPostCard>
  )
}

export default PostCard

const StPostCard = styled.div`
  width: 400px;
  height: 500px;
  margin: 10px auto;
  border-radius: 7px;
  box-shadow: 4px 3px 10px #947d81;

  display: flex;
  flex-direction: column;
`
const StPostCardHead = styled.div`
  color: #df8897;
  width: 400px;
  height: 60px;
  margin: 5px auto;
  padding: 5px 30px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  & h3{
    font-weight: bolder;
  }
`

const StPostImage = styled.img`
  width: 340px;
  height: 340px;
  margin: auto;
  border: 2px solid #df8897;
  border-radius: 7px;
`

const StPostText = styled.div`
  width: 340px;
  height: 300px;
  margin: 5px auto;
  padding: 5px;
`
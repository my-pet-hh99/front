import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Modal from "../common/Modal";


const PostInput = () => {
let [modal, setModal] = useState(false)


  return(
    <>
      <StPostModalBtn>
        <p>내 새끼 자랑글 올리기</p>
      </StPostModalBtn>
      {/* <Modal/> */}
    </>
  )
}

export default PostInput

const StPostModalBtn = styled.button`
  border: solid 4px #ffd9df;
  border-radius: 20px;
  width: 550px;
  height: 50px;
  margin: auto;
  padding-left: 20px;
  font-size: 15px;
  background: none;
  text-align: left;
  &:hover{
    font-weight: 900;
  }
  :focus {outline:none}
  cursor: text;
`;
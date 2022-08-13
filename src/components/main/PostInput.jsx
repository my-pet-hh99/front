import React from "react";
import { useState } from "react";
import styled from "styled-components";
import ModalPopup from "../common/ModaPopupl";


const PostInput = () => {
  const [isOpen, setIsOpen] = useState(false);


  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }


  return(
    <>
      <StPostModalBtn
        onClick={openModal}
      >
        <p>내 새끼 자랑하는 글을 써보세요! 🐶🐹🐱🐰</p>
      </StPostModalBtn>
      <ModalPopup isOpen={isOpen} closeModal={closeModal} />
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
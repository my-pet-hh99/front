import styled from "styled-components";
import React from "react";

const DetailContents = () => {


  return (
    <>
        <Contents>
          <userContent>content</userContent>
          <ButtonArea>
            <AmendButton>수정</AmendButton>
            <DeleteButton>삭제</DeleteButton>
          </ButtonArea>
        </Contents>
    
    </>
  )
}

export default DetailContents;


const Contents = styled.div`

  background-color: rgba(255, 204, 204, 0.1);
  
  width: 800px;
  height: 250px;
  
  margin: auto;
  border: 1px solid pink;
`;

const ButtonArea = styled.button`
  position: relative;
  top: 20px;
  left: 3px;
  margin-top: 3px;
  & > button {
  margin-right: 3px;
  }

  border:0 solid black;
  background-color: rgba(255, 204, 204, 0.1);
`;
const AmendButton = styled.button`
      width: 45px;
    height: 30px;

    border: 2px solid;
    border-radius: 10px;

    font-size: 10px;
    font-weight: bold;
    color: #ad55556b;
`;

const DeleteButton = styled.button`
    width: 45px;
    height: 30px;

    border: 2px solid;
    border-radius: 10px;

    font-size: 10px;
    font-weight: bold;
    color: #ad55556b;
`;

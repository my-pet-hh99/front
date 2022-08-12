import React from "react";
import styled from "styled-components";
import Modal from "react-modal"

const ModalPopup = (props) => {

  return(
    <>
    <Modal 
    		isOpen='true'
			  style='textarea'
			  onRequestClose='overlay'
    >
    	<StModal>
        <StModalForm>
          <StModalImage/>
          <StModalFileUpload
            type='file'
          />
          <StModalText/>
          <StModalBtns>
            <button>저장</button>
            <button>닫기</button>
          </StModalBtns>
        </StModalForm>
      </StModal>
    </Modal>
    </>

  )
}

export default ModalPopup

const StModal = styled.div`
  width: 350px;
  height: 550px;
  position:absolute;
  left:50%;
  top:50%;
  margin-left:-175px;
  margin-top:-275px;

  background-color: #ffd9df;
  border-radius: 7px;
  text-align: center;
  padding: 20px;
`

const StModalForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StModalImage = styled.div`
  background-color: white;
  border-radius: 7px;
  width: 300px;
  height: 300px;
`

const StModalFileUpload = styled.input`
  margin-top: 10px;
  cursor: pointer;
`

const StModalText = styled.textarea`
  width: 300px;
  height: 120px;
  border: solid 5px #ffffff;
  border-radius: 7px;
  background: none;
  margin-top: 10px;
  padding-left: 10px;
  :focus {outline:none}
`

const StModalBtns = styled.div`
  width: 210px;
  height: 30px;
  position: absolute;
  bottom: 20px;
  display: flex;
  
  button{
    width: 100px;
    height: 30px;
    margin: 5px;
    cursor: pointer;
  } 
`
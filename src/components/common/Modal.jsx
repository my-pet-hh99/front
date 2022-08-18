import styled from "styled-components";
import { forwardRef } from "react";

import FullPage from "./FullPage";

const Modal = forwardRef((props, ref) => {
    const modalClose = () => {
        ref.current.style.opacity = 0
        ref.current.style.zIndex = -100
        ref.current.children[0].style.opacity = 0
    }
    return (
        <ModalArea className="fcc" ref={ref} onClick={modalClose}> 
            <ModalBox onClick={(event) => event.stopPropagation()}>{props.children}</ModalBox>
        </ModalArea>
    )
})

const ModalArea = styled(FullPage)`
    opacity: 0;
    z-index: -100;
    background: rgba(0,0,0,0.3);
`

const ModalBox = styled.div`
    width: 500px;
    height: 200px;

    padding : 20px;

    opacity: 0;
    transition-duration: 1s;

    border: 1px solid rgb(255,204,204);
    border-radius: 25px;
    background: white;
`

export default Modal
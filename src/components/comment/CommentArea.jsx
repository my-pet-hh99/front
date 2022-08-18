import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { nanoid } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";

import useLimitInput from "../../util/useLimitInput";

import Comment from "./Comment";
import Modal from "../common/Modal";
import { addComments, readAllComments } from "../../api/commentAPI";

const CommentArea = () => {
  const [commentsList, setList] = useState([]);
  const [pagingBtn, setPagingBtn] = useState([]);
  const [page, setPage] = useState(0);

  const [contents, changeContents, resetContents] = useLimitInput(20);

  const params = useParams().postId;
  const modalRef = useRef(null);

  const getList = () => {
    readAllComments(page, params).then((answer) => {
      setList(answer.list);
      console.log(answer.listLength)
      let pasingNumber = [];
      for (let i = 0; i < answer.listLength / 3; i++) {
        pasingNumber.push(i + 1);
      }
      setPagingBtn(pasingNumber);
    });
  };
  const modalOpen = () => {
    modalRef.current.style.opacity = 1;
    modalRef.current.style.zIndex = 100;
    modalRef.current.children[0].style.opacity = 1;
  };
  const modalClose = () => {
    modalRef.current.style.opacity = 0;
    modalRef.current.style.zIndex = -100;
    modalRef.current.children[0].style.opacity = 0;
  };
  const createComments = () => {
    if (contents === "") {
      alert("댓글 내용이 없습니다!");
      return;
    }
    addComments({text: contents}, params).then(answer => {
      if (answer.result) {
        getList();
        resetContents();
      } else {
        alert(answer.message ? answer.message : '로그인후 이용해 주세요!');
        resetContents();
      }
    });
  };

  useEffect(() => {
    getList();
  }, [page]);

  return (
    <CmArea>
      <CommentsTitle className="fcc">
        <span>댓글</span>
        <span>
          <Btn onClick={modalOpen}>등록</Btn>
        </span>
      </CommentsTitle>
      {commentsList.map((c, i) => {
        return <Comment comments={c} key={i} getList={getList} />;
      })}
      <BtnArea className="fcc">
        {pagingBtn.map((p, i) => {
          return (
            <Btn
              className="fcc"
              key={p + i}
              onClick={() => {
                setPage(p - 1);
              }}
            >
              {p}
            </Btn>
          );
        })}
      </BtnArea>
      <Modal ref={modalRef}>
        <ModalInner>
          <p>댓글 내용</p>
          <textarea
            onChange={changeContents}
            value={contents}
            style={{ height: "80px" }}
            placeholder="20자 제한"
          ></textarea>
        </ModalInner>
        <BtnArea className="fcc">
          <Btn onClick={createComments}>추가하기</Btn>
          <Btn onClick={modalClose}>뒤로가기</Btn>
        </BtnArea>
      </Modal>
    </CmArea>
  );
};

export default CommentArea;

const CmArea = styled.div`
  margin-top: 20px;
  border-top: 1px solid pink;
  padding: 15px;
  background-color: #fff;
`;

const CommentsTitle = styled.div`
  justify-content: space-between !important;
  font-size: 20px;
  font-weight: 600;
  border-bottom: 1px solid pink;
  padding-bottom: 10px;
`;

const BtnArea = styled.div`
  padding-top: 10px;
  & * {
    margin-right: 10px;
  }
`;
const ModalInner = styled.div`
  margin-bottom: 10px;
  & * {
    width: 100%;
    padding: 10px;
    font-size: 20px;
  }
  & > p {
    padding: 0;
    font-size: 25px;
    color: rgb(255, 204, 204);
  }
  & > input,
  & > textArea {
    border: 1px solid rgb(255, 204, 204);
    border-radius: 25px;
    outline: 0;
  }
  & > textArea {
    resize: none;
  }
`;

const Btn = styled.button`
  cursor: pointer;
  border: 1px solid rgb(255,204,204);
  border-radius: 25px;
  padding: 8px;
  font-size: 14px;
  color: white;
  background: rgb(255,204,204);
  &:hover {
    color: rgb(255,204,204);
    background: white;
  }
`
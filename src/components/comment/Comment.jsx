import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { deleteComments } from "../../api/commentAPI";
import axios from "../../axios/axios";

const Comment = (props) => {
  console.log(props)
  const user = useSelector(state => state.user)
  const item = props.comments;
  const itemWriteDate = new Date(item?.createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [commentId, setCommentId] = useState(item?.commentId);

  const [coContents, setcoContents] = useState({
    coContents: item.text,
  });

  // 내용 수정 함수
  const onChange = (e) => {
    setcoContents({
      ...coContents,
      coContents: e.target.value,
    });
  };

  // 버튼으로 disabled 값 변경하기
  const [disabled, setDisabled] = useState(true);
  const onToggle = (e) => {
    alert('기능 구현중입니다!')
    // setDisabled(!disabled);
  };

  // 수정 db 저장함수
  const editHandler = async (edit) => {
    await axios.patch(process.env.REACT_APP_COMMENTSPATH + `/${item.id}`, edit);
  };

  const done = () => {
    onToggle();
    editHandler(coContents);
  };

  const deleteHandler = (commentId) => {
    deleteComments(commentId).then(answer => {
      if(answer.result) {
        props.getList();
      }
    })
  };
  return (
    <PostInfo>
      <UserInfo>
        <div>
          <div style={{ display: "flex" }}>
            <UserName>{item?.author}</UserName>
            <Userdate>{itemWriteDate}</Userdate>
          </div>

          {disabled ? (
            <UserContent
              disabled={disabled}
              value={coContents.coContents}
              onChange={onChange}
              style={{ border: "none" }}
            />
          ) : (
            <UserContent
              disabled={disabled}
              value={coContents.coContents}
              onChange={onChange}
            />
          )}
        </div>
        {+user.loginUser === +props.comments.userId ?
          <ButtonArea>
            <Btn onClick={disabled ? onToggle : done}>
              {disabled ? "수정" : "완료"}
            </Btn>
            <Btn
              onClick={() => {
                deleteHandler(commentId);
              }}
            >
              삭제
            </Btn>
          </ButtonArea> : ''}
      </UserInfo>
    </PostInfo>
  );
};

export default Comment;

const PostInfo = styled.div`
  display: flex;
  border-bottom: 1px solid pink;
  height: 100px;
  padding: 15px;
  background-color: #fff;
`;

const UserInfo = styled.div`
  width: 100%;
  height: 70px;
  margin-left: 15px;
  display: flex; justify-content: space-between; align-items: center;
`;

const UserName = styled.p`
  font-weight: 700;
`;

const Userdate = styled.p`
  color: #b8b8b8;
  font-size: 11px;
  margin: auto 10px;
`;

const UserContent = styled.input`
  font-weight: 400;
  border-radius: 5px;
  background-color: white;
  border-color: #eee;
  width: 400px;
`;

const ButtonArea = styled.div`
  height: 20px;
  margin-top: 5px;
  & > button {
    margin-right: 10px;
  }
`;

const Btn = styled.button`
  cursor: pointer;
  border: 1px solid rgb(255,204,204);
  border-radius: 25px;
  padding: 8px;
  font-size: 10px;
  color: white;
  background: rgb(255,204,204);
  &:hover {
    color: rgb(255,204,204);
    background: white;
  }
`

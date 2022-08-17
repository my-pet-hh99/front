import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

import logo from "../../src_assets/logo.png"

const DetailComment = (props) => {
    const item = props.comments;
    
    // const itemWriteDate = new Date(item?.writeDate).toLocaleDateString("ko-KR", {
    //   year: "numeric",
    //   month: "long",
    //   day: "numeric",
    // });

    const [comments, setComments] = useState({
        comments: item.comments,
    });

    // 내용 수정 함수
    const onChange = (e) => {
        setComments({
            ...comments,
            comments: e.target.value,
        });
    };

    // 버튼으로 disabled 값 변경하기
    const [disabled, setDisabled] = useState(true);
    const onToggle = (e) => {
        setDisabled(!disabled);
    };
    // db 저장함수
    const editHandler = async (edit) => {
        await axios.patch(`~~~url`);

    const done = () => {
        onToggle();
        editHandler(comments);
    };
    const deleteHandler = async (edit) => {
        await axios.delete(`~~~url`);
    };
    }
    return (

        <PostInfo>
            <PostContainer>
                <UserImg src={logo} alt="이미지를 불러올수 없습니다." />
                <UserInfo>
                    <div style={{ display: "flex" }}>
                        <UserName>{item?.author}</UserName>
                        <Userdate>{comments.createdAt}</Userdate>
                    </div>

                    {disabled ? (
                        <UserContent
                            disabled={disabled}
                            value={comments.comments}
                            onChange={onChange}
                            style={{ border: "none" }}
                        />
                    ) : (
                        <UserContent
                            disabled={disabled}
                            value={comments.comments}
                            onChange={onChange}
                        />
                    )}
                    <ButtonArea>
                        <button onClick={disabled ? onToggle : done}>
                            {disabled ? "수정" : "완료"}
                        </button>
                        <button
                            onClick={() => {
                                deleteHandler();
                                props.setEmpty(1);
                            }}
                        >
                            삭제
                        </button>
                    </ButtonArea>
                </UserInfo>
            </PostContainer>
        </PostInfo>
    );
}
export default DetailComment;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid pink;
  height: 150px;
  padding: 15px;
  background-color: #fff;
`;
const PostContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
// 바뀐거
const UserImg = styled.div`
  margin: 0;
  min-width: 50px;
  width: 50px;
  min-height: 50px;
  height: 50px;
`;
const UserInfo = styled.div`
  height: 70px;
  margin-left: 15px;
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
  margin-top: 5px;
  font-size: 15px;
  font-weight: 400;
  background-color: #fff;
  width: 400px;
  height: 30px;
  border-radius: 6px;
  border-color: #eee;
`;

const ButtonArea = styled.div`
  height: 20px;
  margin-top: 5px;
  // 바뀐거
  & > * {
    margin-right: 10px;
  }
`;

import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import logo from "../../src_assets/logo.png"

const DetailPost = () => {

  const nav = useNavigate();
  const { postId } = useParams();
  const [posts, setPosts] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const Amend_ref = useRef();
  const [editPosts, serEditPosts] = useState({
    text: "우리새끼"
  });
  const amendToggle = (e) => {
    e.preventDefault()             //새로고침 방지
    setIsDisabled(!isDisabled)  //재렌더링
    
  }

  const getPosts = async () => {
    const { posts } = await axios.get(`http://localhost:3001/posts?postId=${postId}`);
    setPosts(posts);
  };
  useEffect(() => {
    getPosts();
  }, []);

const editHandler = async (editPosts) => {
  await axios.patch(`http://localhost:3001/posts?postId=${postId}`, editPosts);
};

 const deleteHandler = (postId) => {
    axios.delete(`http://localhost:3001/posts?postId/${postId}`);
    
  };

console.log(posts)
  return (
    <>
      <ImageBox src={logo} alt="이미지를 불러올수 없습니다." />
      <Contents>
        <div>
          <ContentsTop>
            <div>{posts[0]?.author}</div>
            <div>날짜</div>
          </ContentsTop>
          {/* <div>{posts[0]?.text}</div>     옵셔널체이닝 */}
          <AmendInput
            ref={Amend_ref}
            type="text"
            defaultValue={posts[0]?.text}
            onChange={(e) => {
              const { value } = e.target;
              setPosts({ ...posts, text: value });
              
            }}
            const disabled={isDisabled}
          />
          <ButtonArea>
            {
              isDisabled == true ?
                <AmendButton onClick={(e) => amendToggle(e)}>수정</AmendButton>
                : <AmendButton onClick={(e) => 
                   {e.preventDefault()
                    editHandler(e)}
                   } >완료</AmendButton>
            }
            <DeleteButton onClick={(e) => deleteHandler(posts)}>삭제</DeleteButton>

          </ButtonArea>
        </div>
      </Contents>
    </>
  )
};


export default DetailPost;

const ImageBox = styled.div`
  width: 100%;
  vertical-align: middle;
  height: 300px;
  margin: auto;
  background-position: center;
  background-size:cover ;
`;

const ContentsTop = styled.div`

  display: flex;
  width: 560px;
  justify-content:space-between ;

  margin: auto;


`;

const Contents = styled.form`

  background-color: rgba(255, 204, 204, 0.1);
  
  width: 600px;
  height: 250px;
  
  margin: auto;
  border: 1px solid pink;
  border-radius: 25px;
  padding: 20px;
`;

const ButtonArea = styled.button`
  
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

const AmendInput = styled.input`
    
`;

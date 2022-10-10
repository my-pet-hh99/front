import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {useSelector} from "react-redux"
<<<<<<< HEAD

=======
>>>>>>> 196495e764f7ba8e42644a43bad7af14bc75e26c
import axios from "../../axios/axios";

const DetailPost = () => {

  const nav = useNavigate();
  const { postId } = useParams();
<<<<<<< HEAD
=======

>>>>>>> 196495e764f7ba8e42644a43bad7af14bc75e26c
  const [posts, setPosts] = useState(null);
  const Amend_ref = useRef();

  // 정우 만든곳
  const user = useSelector(state => state.user)
  const writeDate = new Date(posts?.createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  // const [editPosts, setEditPosts] = useState({
  //   text: ''
  // });
  const amendToggle = (e) => {
    e.preventDefault()             //새로고침 방지
    alert('기능 구현중입니다~')
    // setIsDisabled(!isDisabled)  //재렌더링
  }

  const getPosts = async () => {
    try {
      const data = await axios.get(`/post/${postId}`);
      setPosts(data.data.data)
    } catch(err) {
      alert('게시글이 없습니다.')
    }
  };
<<<<<<< HEAD



=======
>>>>>>> 196495e764f7ba8e42644a43bad7af14bc75e26c
  // const editHandler = async (editPosts) => {
  //   await axios.patch(`http://localhost:3001/posts?postId=${postId}`, editPosts);
  // };

  const deleteHandler = (e) => {
    e.preventDefault()
    const data = axios.delete(`/post/${postId}`);
    data
    .then((answer)=>{
      console.log(answer)
      nav('/')
    })
    .catch((err) => {
      alert('게시글 삭제를 실패하셨습니다.')
    })

  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="fcc" style={{flexFlow: 'column'}}>
      <ImageBox src={posts?.imageUrl} alt="이미지를 불러올수 없습니다." />
      <Contents>
        <div>
          <ContentsTop>
            <div>{posts?.author}</div>
            <div>{writeDate}</div>
          </ContentsTop>
          {/* <div>{posts[0]?.text}</div>     옵셔널체이닝 */}
          <AmendInput
            ref={Amend_ref}
            type="text"
            defaultValue={posts?.text}
            // onChange={(e) => {
            //   const { value } = e.target;
            // }}
            disabled={true}
          />
          
          {+user.loginUser === +posts?.userId ?
          <ButtonArea>
            <AmendButton onClick={amendToggle}>수정</AmendButton>
                {/* <AmendButton onClick={(e) => 
                   {e.preventDefault()
                    editHandler(e)}
                   } >완료</AmendButton> */}
            <DeleteButton onClick={deleteHandler}>삭제</DeleteButton>
          </ButtonArea> : null}
          
        </div>
      </Contents>
    </div>
  )
};


export default DetailPost;

<<<<<<< HEAD
=======

>>>>>>> 196495e764f7ba8e42644a43bad7af14bc75e26c
const ImageBox = styled.img`
  width: 50%;
  height: 300px;
  border: 2px solid rgb(255,204,204);
  border-radius: 25px;
  padding: 10px;
`;

const ContentsTop = styled.div`
  display: flex; justify-content:space-between ;
  width: 560px;
`;

const Contents = styled.form`

  background-color: rgba(255, 204, 204, 0.1);
  
  width: 600px;
  height: 250px;
  
<<<<<<< HEAD
=======

>>>>>>> 196495e764f7ba8e42644a43bad7af14bc75e26c
  border: 1px solid pink;
  border-radius: 25px;
  padding: 20px;
  margin-top: 10px;
<<<<<<< HEAD

=======
>>>>>>> 196495e764f7ba8e42644a43bad7af14bc75e26c
`;

const ButtonArea = styled.button`
  margin-top: 3px;
  & > button {
  margin-right: 10px;
<<<<<<< HEAD
  
  }

=======
  }
  
>>>>>>> 196495e764f7ba8e42644a43bad7af14bc75e26c
  border:0 solid black;
  background-color: rgba(255, 204, 204, 0.1);
`;
const AmendButton = styled.button`
    cursor: pointer;
    width: 45px;
    height: 30px;

    border: 2px solid;
    border-radius: 10px;

    font-size: 10px;
    font-weight: bold;
    color: #ad55556b;
`;

const DeleteButton = styled.button`
    cursor: pointer;
    width: 45px;
    height: 30px;

    border: 2px solid;
    border-radius: 10px;

    font-size: 10px;
    font-weight: bold;
    color: #ad55556b;
`;

const AmendInput = styled.input`
     width: 560px;
    height: 160px;
`;

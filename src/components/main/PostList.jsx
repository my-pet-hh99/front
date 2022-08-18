import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import axios from "../../axios/axios";

const PostList = () => {
  const navigate = useNavigate();

  const [offset, setOffset] = useState(0);
  const [posts, setPosts] = useState([]);

  // 무한스크롤
  const [lastRef, lastCard] = useInView({
    threshold: 0.8,
    triggerOnce: true,
  });

  useEffect(()=>{
    const getPosts = async () => {
      const data = await axios.get(`/post?offset=${offset}`)
      setPosts(data.data.posts)
      setOffset(offset+1)
    }
    getPosts()
  },[])

  useEffect(()=>{
    const getPostsScroll = async () => {
      // 여기 바꿈
      if(lastCard) {
        const data = await axios.get(`/post?offset=${offset}`)
        setPosts([...posts, ...data.data.posts ])
        setOffset(offset+1)
      }
    }
    getPostsScroll()
  },[lastCard])

  return(
    <>
      {
        posts.map((post, i)=> {
          return (
          <StPostCard key={i} ref={i = posts.length-1?lastRef:null}
            onClick={()=>{navigate(`/detail/${post.postId}`)}}
          >
            <StPostCardHead>
              <h3>{post.author}</h3>
              <p>
                작성일 {post.createdAt.slice(5,10)}
              </p>
            </StPostCardHead>
            <StPostImage src={post.imageUrl} alt='이미지를 불러올 수 없습니다'/>
            <StPostText>
              {post.text}
              {
                `${post.createdAt}`!==`${post.updatedAt}` ?
                <p>● 수정됨</p> : null
              }
            </StPostText>
          </StPostCard>
        )})
      }
    </>
  )
}

export default PostList

const StPostCard = styled.div`
  width: 400px;
  height: 500px;
  margin: 10px auto;
  border-radius: 7px;
  box-shadow: 4px 3px 10px #947d81;

  display: flex;
  flex-direction: column;
`
const StPostCardHead = styled.div`
  color: #df8897;
  width: 400px;
  height: 60px;
  margin: 5px auto;
  padding: 5px 30px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  & h3{
    font-weight: bolder;
  }
`

const StPostImage = styled.img`
  width: 340px;
  height: 340px;
  margin: auto;
  border: 2px solid #df8897;
  border-radius: 7px;
`

const StPostText = styled.div`
  width: 340px;
  height: 90px;
  margin: 5px auto;
  padding: 5px;
  position: relative;
  & p{
      position: absolute;
      right: -10px;
      bottom: 10px;
      margin-top: 10px;
      font-weight: bold;
      font-size: 13px;
      color: #bdbdbd;
    }
`
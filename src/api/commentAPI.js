import axios from "../axios/axios";

export const readAllComments = async (page, postId) => {
    let answer = {result: null}
    try {
        const res = await axios.get(`/comment/${postId}`);
        answer.result = res.data.result
        answer.list = res.data.data.slice(page * 3, page * 3 + 3)
        answer.listLength = res.data.data.length
    } catch(err) {
        // console.log(err)
    }
  return answer;
};

export const addComments = async (newComments, postId) => {
    let answer = {result: null}
    try {
        const res = await axios.post(`/comment/${postId}`, newComments);
        answer.result = res.data.result
    } catch(err) {
        answer.result = err.response.data.result
        answer.message = err.response.data.message
    }
    return answer
};

export const deleteComments = async (commentId) => {
    let answer = {result: null}
    try {
        const res = await axios.delete(`/comment/${commentId}`);
        answer.result = res.data.result
    } catch(err) {
        // console.log(err)
    }
    return answer
};
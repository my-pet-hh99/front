import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "../../axios/axios";

export const getPosts = createAsyncThunk(
  "GET_POSTS",
  async (offset) => {
    try {
      // const resp = await axios.get(`http://localhost:3001/posts?offset=${offset}`);
      const {resp} = await axios.get(`/post?offset=${offset}`);
      return (
        resp.data
      )
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = [];

export const commentSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [getPosts.fulfilled]: (state, {payload}) => [...payload], 
  } 
});

export const {} = commentSlice.actions;
export default commentSlice.reducer;
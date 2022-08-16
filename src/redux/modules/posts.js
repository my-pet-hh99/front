import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

import axios from "axios";

export const getPosts = createAsyncThunk(
  "GET_POSTS",
  async () => {
    try {
      // const [offset, setOffset] = useState(0);
      const resp = await axios.get("http://localhost:3001/posts");
      // const {resp} = await axios.get(`/api/post?offset=${offset}`);
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
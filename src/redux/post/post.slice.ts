import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { JsonPost } from "../../types/common";

export const fetchPost = createAsyncThunk("post/fetchPost", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts").then((response) => response.json());
    return response;
});

export interface PostState {
    posts: JsonPost[] | null;
    status: "idle" | "loading" | "complete";
}

export const initialState: PostState = {
    posts: null,
    status: "idle",
};

export const postSlice = createSlice({
    name: "post",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPost.pending, (state, action) => {
            state.status = "loading";
        });
        builder.addCase(fetchPost.fulfilled, (state, action) => {
            state.status = "complete";
            state.posts = action.payload;
        });
    },
});

export default postSlice.reducer;

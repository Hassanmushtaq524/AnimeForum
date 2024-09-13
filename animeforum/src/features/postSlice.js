import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import constants from "../constants/constants";

//TODO: Implement
/**
 * No auth
 */
export const fetchAllPosts = createAsyncThunk('post/fetchAllPosts', async (post, { rejectWithValue }) => {
    return null;
});
  
/**
 * Auth
 */
export const addPost = createAsyncThunk('post/addPost', async (post, { rejectWithValue }) => {
    return null;
});

/**
 * 
 */
export const fetchMyPosts = createAsyncThunk('post/fetchMyPosts', async (userInfo) => {
    return null;
});

export const fetchLikePosts = createAsyncThunk('post/fetchLikePosts', async (userInfo) => {
    return null;
});

export const likePost = createAsyncThunk('post/fetchLikePosts', async (userInfo) => {
    return null;
});


// TODO: implement
const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        error: null,
        status: constants.STATUS_IDLE
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPosts.fulfilled, (state) => {
                
            })
            .addCase(fetchLikePosts.fulfilled, (state) => {
                
            })
            .addCase(fetchMyPosts.fulfilled, (state) => {
                
            })
            .addCase(addPost.fulfilled, (state) => {
                
            })
    }
})


export default postSlice.reducer;


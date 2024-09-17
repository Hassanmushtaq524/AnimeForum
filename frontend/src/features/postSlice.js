import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import constants from "../constants/constants";

//TODO: Implement
/**
 * No auth
 */
export const fetchAllPosts = createAsyncThunk('post/fetchAllPosts', async ({ rejectWithValue }) => {
    try {
        const url = `${process.env.REACT_APP_API_URL}/posts/`;
        const response = await fetch(url, {
            method: "GET"
        });

        if (!response.ok) {
            return rejectWithValue({ error: "Invalid request" });
        }

        const data = await response.json();

        const payload = {
            posts: data.posts
        }

        return payload;
    } catch (error) {
        return rejectWithValue({ error: error.message || "Invalid request"});
    }
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
            /** Handle the fetchAllPosts states */
            .addCase(fetchAllPosts.pending, (state) => {
                state.error = null;
                state.status = constants.STATUS_PENDING;
            })
            .addCase(fetchAllPosts.fulfilled, (state, action) => {
                state.posts = action.payload.posts;
                state.error = null;
                state.status = constants.STATUS_SUCCESS;
            })
            .addCase(fetchAllPosts.rejected, (state, action) => {
                state.posts = [];
                state.error = action.payload.error;
                state.status = constants.STATUS_FAILED;
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


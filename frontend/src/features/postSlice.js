import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import constants from "../constants/constants";

//TODO: Implement
/**
 * No auth
 */
export const fetchAllPosts = createAsyncThunk('post/fetchAllPosts', async ( _, { rejectWithValue }) => {
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
 * Auth required
 */
export const addPost = createAsyncThunk('post/addPost', async ({ post, token }, { rejectWithValue }) => {
    try {
        const url = `${process.env.REACT_APP_API_URL}/posts/`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : `${token}`
            },
            body: JSON.stringify(post)
        });

        if (!response.ok) {
            return rejectWithValue({ error: "Invalid request" });
        }
        
        const data = await response.json();

        const payload = {
            post: data.post
        }

        return payload;
    } catch (error) {
        return rejectWithValue({ error: error.message || "Invalid request"});
    }
});

/**
 * 
 */
export const likePost = createAsyncThunk('post/likePost', async ({ _id, token }, { rejectWithValue }) => {
    try {
        const url = `${process.env.REACT_APP_API_URL}/posts/like/${_id}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'auth-token' : `${token}`
            }
        });

        if (!response.ok) {
            return rejectWithValue({ error: "Invalid request" });
        }
        
        const data = await response.json();

        const payload = {
            post: data.post
        }

        return payload;
    } catch (error) {
        return rejectWithValue({ error: error.message || "Invalid request"});
    }
});


/**
 * Auth required
 */
export const fetchMyPosts = createAsyncThunk('post/fetchMyPosts', async (userInfo) => {
    return null;
});

export const fetchLikePosts = createAsyncThunk('post/fetchLikePosts', async (userInfo) => {
    return null;
});


/**
 * Repeated rejection and pending states
 */ 
const handlePending = (state) => {
    state.error = null;
    state.status = constants.STATUS_PENDING;
} 

const handleRejected = (state, action) => {
    state.error = action.payload?.error;
    state.status = constants.STATUS_FAILED;
}

// TODO: implement
const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        error: null,
        status: constants.STATUS_IDLE
    },
    reducers: {
        setError: (state, action) => {
            state.error = action.payload?.error;
        }
    },
    extraReducers: (builder) => {
        builder
            /** Handle the fetchAllPosts states */
            .addCase(fetchAllPosts.pending, (state) => {
                handlePending(state);
            })
            .addCase(fetchAllPosts.fulfilled, (state, action) => {
                state.posts = action.payload.posts;
                state.error = null;
                state.status = constants.STATUS_SUCCESS;
            })
            .addCase(fetchAllPosts.rejected, (state, action) => {
                state.posts = [];
                handleRejected(state, action);
            })
            /** Add post  */
            .addCase(addPost.pending, (state) => {
                handlePending(state);
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.posts.push(action.payload.post);
                state.error = null;
                state.status = constants.STATUS_SUCCESS;
            })
            .addCase(addPost.rejected, (state, action) => {
                handleRejected(state, action);
            })
            /** Like post */
            .addCase(likePost.pending, (state) => {
                handlePending(state);
            })
            .addCase(likePost.fulfilled, (state, action) => {
                const idx = state.posts.findIndex((post) => post._id === action.payload.post._id);
                state.posts[idx] = action.payload.post;
                state.error = null;
                state.status = constants.STATUS_SUCCESS;
            })
            .addCase(likePost.rejected, (state, action) => {
                handleRejected(state, action);
            })
            .addCase(fetchLikePosts.fulfilled, (state) => {
                
            })
            .addCase(fetchMyPosts.fulfilled, (state) => {
                
            })
            
    }
})

export const { setError } = postSlice.actions;
export default postSlice.reducer;


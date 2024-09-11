import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: []
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post.id === action.payload.post.id) {
                    return action.payload.post
                } else {
                    return post
                }
            })
            state.posts = updatedPosts;
        }
    }
})

export const { setPosts, setPost } = postsSlice.actions;
export default postSlice.reducer;


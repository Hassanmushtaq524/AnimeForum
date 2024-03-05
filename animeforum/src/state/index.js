import { createSlice } from "@reduxjs/toolkit";

const globalState = createSlice({
    name: "globalState",
    initialState: {
        user: null,
        posts: []
    },
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            localStorage.setItem("token", action.payload.token);
        },
        setLogout: (state) => {
            state.user = null;
            localStorage.removeItem("token");
        },
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

export const { setLogin, setLogout, setPosts } = globalState.actions;
export default globalState.reducer;
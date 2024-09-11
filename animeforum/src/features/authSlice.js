import { createSlice } from "@reduxjs/toolkit";


//TODO: Implement, login and signup Async Thunks
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
    return null;
});
  
export const logoutUser = createAsyncThunk('auth/signupUser', async () => {
    return null;
});


// TODO: implement login and signup reducers
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        status: 'idle'
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(signupUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})


export default authSlice.reducer;


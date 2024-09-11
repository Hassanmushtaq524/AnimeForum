import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null
    },
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        }
    }
})

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;


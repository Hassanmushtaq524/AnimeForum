import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import constants from "../constants/constants";

//TODO: review
export const login = createAsyncThunk('auth/login', async (userInfo, { rejectWithValue }) => {
    try {
        const url = `${process.env.REACT_APP_API_URL}/auth/login`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })

        if (!response.ok) {
            return rejectWithValue({ error: "Invalid credentials" })
        }

        const data = await response.json()

        const payload = {
            user: data.user,
            token: data.jwtToken
        }
        return payload
    } catch (error) {
        return rejectWithValue({ error: error.message || "Invalid credentials" })
    }
});
  
export const signup = createAsyncThunk('auth/signup', async (userInfo, { rejectWithValue }) => {
    try {
        const url = `${process.env.REACT_APP_API_URL}/auth/signup`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })

        if (!response.ok) {
            return rejectWithValue({ error: "Invalid credentials" })
        }

        const data = await response.json()

        const payload = {
            user: data.user,
            token: data.jwtToken
        }
        return payload
    } catch (error) {
        return rejectWithValue({ error: error.message || "Invalid credentials" })
    }
});


// TODO: review
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        error: null,
        status: constants.STATUS_IDLE
    },
    reducers: {
        setError: (state, action) => {
            state.error = action.payload.error;
        },
        logout: (state) => {
            state.user = null;
            state.error = null;
            state.status = constants.STATUS_IDLE;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = constants.STATUS_PENDING;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = constants.STATUS_SUCCESS;
                state.user = action.payload.user;
                state.error = null;
                localStorage.setItem("token", action.payload.token)
            })
            .addCase(login.rejected, (state, action) => {
                state.status = constants.STATUS_FAILED;
                state.user = null;
                state.error = action.payload.error;
                if (localStorage.getItem("token")) { 
                    localStorage.removeItem("token")
                }
            })
            .addCase(signup.pending, (state) => {
                state.status = constants.STATUS_PENDING;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.status = constants.STATUS_SUCCESS;
                state.user = action.payload.user;
                state.error = null;
                localStorage.setItem("token", action.payload.token)
                
            })
            .addCase(signup.rejected, (state, action) => {
                state.status = constants.STATUS_FAILED;
                state.user = null;
                state.error = action.payload.error;
                if (localStorage.getItem("token")) { 
                    localStorage.removeItem("token")
                }
            })
    }
})

export const { setError, logout } = authSlice.actions;

export default authSlice.reducer;


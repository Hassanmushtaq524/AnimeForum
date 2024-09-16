import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import constants from "../constants/constants";

//TODO: review

/**
 * Middleware to login the user
 * 
 * @returns payload to the reducer OR error
 */
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
  

/**
 * Middleware to sign up the user
 * 
 * @returns payload to the reducer OR error
 */
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
            return rejectWithValue({ error: "Invalid credentials" });
        }

        const data = await response.json()

        const payload = {
            user: data.user,
            token: data.jwtToken
        }
        return payload
    } catch (error) {
        return rejectWithValue({ error: error.message || "Invalid credentials" });
    }
});


// TODO: review
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        error: null,
        token: null,
        status: constants.STATUS_IDLE
    },
    reducers: {
        resetState: (state) => {
            state.user = null;
            state.error = null;
            state.token = null;
            state.status = constants.STATUS_IDLE;
        },
        setError: (state, action) => {
            state.error = action.payload?.error;
        },
        logout: (state) => {
            state.user = null;
            state.error = null;
            state.token = null;
            state.status = constants.STATUS_IDLE;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = constants.STATUS_PENDING;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = constants.STATUS_SUCCESS;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = constants.STATUS_FAILED;
                state.user = null;
                state.token = null;
                state.error = action.payload.error;
            })
            .addCase(signup.pending, (state) => {
                state.status = constants.STATUS_PENDING;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.status = constants.STATUS_SUCCESS;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(signup.rejected, (state, action) => {
                state.status = constants.STATUS_FAILED;
                state.user = null;
                state.token = null;
                state.error = action.payload.error;
            })
    }
})

export const { setError, logout, resetState } = authSlice.actions;

export default authSlice.reducer;


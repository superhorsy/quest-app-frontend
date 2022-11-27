import {createSlice} from "@reduxjs/toolkit";
// import {testFetchPosts} from "../actions/actions";
import {login, registration} from "../actions/actions";


export const initialState = {
    isAuth: false,
    user: null,
    isLoading: false,
    error: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        checkAuth(state, action) {
            state.isAuth = true;
        },
        logOut(state, action) {
            localStorage.removeItem('token');
            state.isAuth = false;
        }
    },
    extraReducers: {
        [login.pending.type]: (state, action) => {
            state.isLoading = true
        },
        [login.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.error = ''
            state.isAuth = true
            state.user = action.payload
        },
        [login.rejected.type]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        [registration.pending.type]: (state, action) => {
            state.isLoading = true
        },
        [registration.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.error = ''
            state.isAuth = true
            state.user = action.payload
        },
        [registration.rejected.type]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
});

export default authSlice.reducer;

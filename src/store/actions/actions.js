import {createAsyncThunk} from "@reduxjs/toolkit";
import {testPostsApi, loginApi, registrationApi} from "../../api/api";


export const testFetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await testPostsApi.fetchPosts()
            return data
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (loginData, {rejectWithValue}) => {
        try {
            const {data} = await loginApi(loginData);
            localStorage.setItem('token', data.jwt);
            return data;
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const registration = createAsyncThunk(
    'auth/registration',
    async (registrationData, {rejectWithValue}) => {
        try {
            const {data} = await registrationApi(registrationData);
            localStorage.setItem('token', data.jwt);
            return data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
)

//Пока предлагаю писать все экшены здесь, если сильно очень разрастется (что вряд ли), то разнесем
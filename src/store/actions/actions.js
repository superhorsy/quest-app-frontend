import {createAsyncThunk} from "@reduxjs/toolkit";
import {testPostsApi} from "../../api/api";

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

//Пока предлагаю писать все экшены здесь, если сильно очень разрастется (что вряд ли), то разнесем
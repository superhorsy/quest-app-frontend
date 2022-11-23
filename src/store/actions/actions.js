import {createAsyncThunk} from "@reduxjs/toolkit";
import {questExecutionApi, testPostsApi} from "../../api/api";

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

export const getInitQuest = createAsyncThunk(
    'quests/getInitQuest',
    async (_, {rejectWithValue}) => {
        try {
            return await questExecutionApi.getInitQuest()
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const getNextQuest = createAsyncThunk(
    'quests/getNextQuest',
    async (id, {rejectWithValue}) => {
        try {
            return await questExecutionApi.getNextQuest(id)
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)
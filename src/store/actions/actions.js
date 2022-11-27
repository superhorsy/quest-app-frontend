import { createAsyncThunk } from "@reduxjs/toolkit";

import {questExecutionApi, questsApi, testPostsApi } from "../../api/api";

// Пример

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


export const fetchQuests = createAsyncThunk(
  "quests/fetchQuests",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await questsApi.fetchQuests();
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const createQuest = createAsyncThunk(
  "quests/createQuest",
  async (quest, { rejectWithValue }) => {
    try {
      const response = await questsApi.createQuest(quest);
      // If you want to get something back
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

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
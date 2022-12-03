import { createAsyncThunk } from "@reduxjs/toolkit";
import {questExecutionApi, questsApi, userProfileApi, authApi, testPostsApi } from "../../api/api";

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
);

export const login = createAsyncThunk(
  "auth/login",
  async (loginData, {rejectWithValue}) => {
    try {
      const {data} = await authApi.loginUser(loginData);
      localStorage.setItem('token', data.jwt);
      return data;
    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
);

export const registration = createAsyncThunk(
  "auth/registration",
  async (registrationData, {rejectWithValue}) => {
    try {
      const {data} = await authApi.registrationUser(registrationData);
      localStorage.setItem('token', data.jwt);
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchCreatedQuests = createAsyncThunk(
  "quests/fetchQuests",
  async (questsData, { rejectWithValue }) => {
    try {
      const { data } = await questsApi.fetchCreatedQuests(questsData);
      console.log('ответ на запрос о получении квестов', data.data)
      return data.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const deleteQuest = createAsyncThunk(
  "quests/deleteQuest",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await questsApi.deleteQuest(id);
      console.log('ответ на запрос об удалении', data.data)
      return data.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const updateQuest = createAsyncThunk(
  "quests/updateQuest",
  async (questData, { rejectWithValue }) => {
    try {
      const { data } = await questsApi.updateQuest(questData.id, questData);
      return data.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "userProfile/fetchUserProfile",
  async (_, {rejectWithValue}) => {
    try {
      const {data} = await userProfileApi.fetchUserProfile();
      console.log("получение результата по запросу", data.data);
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const createQuest = createAsyncThunk(
  "quests/createQuest",
  async (quest, {rejectWithValue}) => {
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
);


export const getNextQuest = createAsyncThunk(
  'quests/getNextQuest',
  async (id, {rejectWithValue}) => {
    try {
      return await questExecutionApi.getNextQuest(id)
    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import { questExecutionApi, questsApi, userProfileApi, authApi, uploadApi } from "../../api/api";

export const login = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const { data } = await authApi.loginUser(loginData);
      localStorage.setItem('token', data.jwt);
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data.error)
    }
  }
);

export const registration = createAsyncThunk(
  "auth/registration",
  async (registrationData, { rejectWithValue }) => {
    try {
      const { data } = await authApi.registrationUser(registrationData);
      localStorage.setItem('token', data.jwt);
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data.error);
    }
  }
);

export const fetchCreatedQuests = createAsyncThunk(
  "quests/fetchQuests",
  async (questsData, { rejectWithValue }) => {
    try {
      const { data } = await questsApi.fetchCreatedQuests(questsData);
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data.error);
    }
  }
);

export const fetchAvailableQuests = createAsyncThunk(
  "quests/fetchAvailableQuests",
  async (avQData, { rejectWithValue }) => {
    try {
      const { data } = await questsApi.fetchAvailableQuests(avQData);
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data.error);
    }
  }
);

export const fetchQuestInfo = createAsyncThunk(
  "quest/fetchQuestInfo",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await questsApi.getQuestStatus(id);
      return data.data;
    } catch (e) {
      return rejectWithValue(e.response.data.error);
    }
  }
);

export const deleteQuest = createAsyncThunk(
  "quests/deleteQuest",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await questsApi.deleteQuest(id);
      return data.data;
    } catch (e) {
      return rejectWithValue(e.response.data.error);
    }
  }
);

export const sendQuest = createAsyncThunk(
  "quests/sendQuest",
  async (questData, { rejectWithValue }) => {
    try {
      const { data } = await questsApi.sendQuest(questData.questId, questData.data);
      return data.data;
    } catch (e) {
      return rejectWithValue(e.response.data.error);
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
      return rejectWithValue(e.response.data.error);
    }
  }
);

export const fetchFinishedQuests = createAsyncThunk(
  "quests/fetchFinishedQuests",
  async (avQData, { rejectWithValue }) => {
    try {
      const { data } = await questsApi.fetchFinishedQuests(avQData);
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data.error);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "userProfile/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await userProfileApi.fetchUserProfile();
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data.error);
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
      return rejectWithValue(e.response.data.error);
    }
  }
);

export const getInitQuest = createAsyncThunk(
  'quests/getInitQuest',
  async (questId, { rejectWithValue }) => {
    try {
      const { data } = await questExecutionApi.getInitQuest(questId);
      return data
    } catch (e) {
      return rejectWithValue(e.response.data.error)
    }
  }
);

export const getStatusQuest = createAsyncThunk(
  'quests/getStatusQuest',
  async (questId, { rejectWithValue }) => {
    try {
      const { data } = await questExecutionApi.getStatusQuest(questId);
      return data
    } catch (e) {
      return rejectWithValue(e.response.data.error)
    }
  }
);

export const getNextQuest = createAsyncThunk(
  'quests/getNextQuest',
  async (dataAnswer, { rejectWithValue }) => {
    try {
      const { data } = await questExecutionApi.getNextQuest(dataAnswer)
      return data
    } catch (e) {
      return rejectWithValue(e.response.data.error)
    }
  }
);

export const fetchQuest = createAsyncThunk(
  "currentQuest/fetchCurrentQuest",
  async (questId, { rejectWithValue }) => {
    try {
      const { data } = await questsApi.fetchQuest(questId);
      return data.data;
    } catch (e) {
      return rejectWithValue(e.response.data.error);
    }
  }
);

export const getQuestStatus = createAsyncThunk(
  "currentQuest/getQuestStatus",
  async (questId, { rejectWithValue }) => {
    try {
      const { data } = await questsApi.getQuestStatus(questId);
      return data.data.quest_status;
    } catch (e) {
      return rejectWithValue(e.response.data.error);
    }
  }
);

export const getMedia = createAsyncThunk(
  "media/getMedia",
  async (mediaId, { rejectWithValue }) => {
    try {
      const { data } = await uploadApi.fetchMedia(mediaId);
      console.log("media", data);
      return data.data;
    } catch (e) {
      return rejectWithValue(e.response.data.error);
    }
  }
);

export const uploadFile = createAsyncThunk(
  "media/uploadFile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await uploadApi.uploadFile(formData);
      console.log("unswer after upload", response.data);
      return response.data.data;
    } catch (e) {
      return rejectWithValue(e.response.data.error);
    }
  }
);

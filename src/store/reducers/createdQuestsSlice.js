import {createSlice} from "@reduxjs/toolkit";
import {fetchCreatedQuests, createQuest, deleteQuest, sendQuest} from "../actions/actions";

const initialState = {
  quests: [],
  isLoading: false,
  error: '',
  sendQuestSuccess: null
}

const createdQuestsSlice = createSlice({
  name: 'quests',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchCreatedQuests.pending.type]: (state, action) => {
      state.isLoading = true
    },
    [fetchCreatedQuests.fulfilled.type]: (state, action) => {
      state.isLoading = false
      state.error = ''
      state.quests = action.payload
    },
    [fetchCreatedQuests.rejected.type]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    [createQuest.pending.type]: (state, action) => {
      state.isLoading = true
    },
    [createQuest.fulfilled.type]: (state, action) => {
      state.isLoading = false
      state.error = ''
      if (action.payload.data.steps === null) {
        action.payload.data.steps = [];
      }
      if(state.quests === null) {
        state.quests = [action.payload.data];
      }
      state.quests.push(action.payload.data);
    },
    [createQuest.rejected.type]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    [deleteQuest.pending.type]: (state, action) => {
      state.isLoading = true
    },
    [deleteQuest.fulfilled.type]: (state, action) => {
      state.isLoading = false
      state.error = ''
      state.quests = state.quests.filter(quest => quest.id !== action.meta.arg)
    },
    [deleteQuest.rejected.type]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    [sendQuest.pending.type]: (state, action) => {
      state.isLoading = true
    },
    [sendQuest.fulfilled.type]: (state, action) => {
      state.isLoading = false
      state.error = ''
      state.sendQuestSuccess = action.payload.success
    },
    [sendQuest.rejected.type]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
  }
})

export default createdQuestsSlice.reducer;

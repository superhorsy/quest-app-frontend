import {createSlice} from "@reduxjs/toolkit";
import { fetchCreatedQuests, createQuest, updateQuest, deleteQuest } from "../actions/actions";

const initialState = {
  quests: [],
  isLoading: false,
  error: ''
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
      state.quests.push(...action.payload)
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
      state.quests.push(action.payload.data);
    },
    [createQuest.rejected.type]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    }
  }
})
export const {addStep} = createdQuestsSlice.actions;
export default createdQuestsSlice.reducer;

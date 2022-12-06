import {createSlice} from "@reduxjs/toolkit";
import { fetchQuest, updateQuest } from "../actions/actions";


const initialState = {
  currentQuest: {},
  isLoading: false,
  error: ''
}

const currentQuestSlice = createSlice({
  name: 'currentQuest',
  initialState,
  reducers: {
    addOneStep(state, action) {
      state.currentQuest.steps.push(action.payload);
    },
    addSteps(state, action) {
      if (state.currentQuest.steps === null) {
        state.currentQuest.steps = [];
      }
      state.currentQuest.steps = action.payload;
    },
    updateTheme(state, action) {
      state.currentQuest.theme = action.payload;
      console.log('current quest with new theme:', state.currentQuest);
    }
  },
  extraReducers: {
    [fetchQuest.pending.type]: (state, action) => {
      state.isLoading = true
    },
    [fetchQuest.fulfilled.type]: (state, action) => {
      state.isLoading = false
      state.error = ''
      state.currentQuest = action.payload;
    },
    [fetchQuest.rejected.type]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
  }
})

export const { addSteps, addOneStep, updateTheme } = currentQuestSlice.actions;
export default currentQuestSlice.reducer;
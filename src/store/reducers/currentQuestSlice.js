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
      console.log("step payload one step: >>>>", action.payload);
      console.log("steps", state.currentQuest);
      state.currentQuest.steps.push(action.payload);
      console.log('steps after add:',state.currentQuest.steps);
    },
    addSteps(state, action) {
      if (state.currentQuest.steps === null) {
        state.currentQuest.steps = [];
      }
      // state.currentQuest.steps.push(action.payload);
      console.log("step payload: >>>>", action.payload);
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

export const { addSteps, addOneStep } = currentQuestSlice.actions;
export default currentQuestSlice.reducer;
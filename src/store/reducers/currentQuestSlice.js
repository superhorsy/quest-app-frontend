import {createSlice} from "@reduxjs/toolkit";
import {fetchQuest, updateQuest, getQuestStatus} from "../actions/actions";

const initialState = {
  currentQuest: {},
  isLoading: false,
  status: '',
  error: '',
}

const currentQuestSlice = createSlice({
  name: 'currentQuest',
  initialState,
  reducers: {
    addCoupon(state, action) {
      // !!!!!Эта логика полностью перезапишет rewards!!!!
      // TODO написать логику, которая не будет перезаписывать rewards,
      // TODO а будет переписывать только кукпон
      state.currentQuest.rewards = [];
      state.currentQuest.rewards.push(action.payload);
    },
    addOneStep(state, action) {
      state.currentQuest.steps.push(action.payload);
    },
    addSteps(state, action) {
      if (state.currentQuest.steps === null) {
        state.currentQuest.steps = [];
      }
      state.currentQuest.steps = action.payload;
    },
    editStep(state, action) {
      state.currentQuest.steps = state.currentQuest.steps.map((step) => {
        return step.id === action.payload.id ? action.payload : step
      })
    },
    updateTheme(state, action) {
      state.currentQuest.theme = action.payload;
    },
    deleteStep(state, action) {
      const _steps = state.currentQuest.steps.filter(step => step.id !== action.payload);
      state.currentQuest.steps = _steps.map((step, ind) => {
        step.sort = ind + 1;
        return step;
      })
    },
    updateProfileQuest(state, action) {
      state.currentQuest.name = action.payload.name;
      state.currentQuest.description = action.payload.description;

    },
    addFinalQuestMessage(state, action) {
      state.currentQuest.final_message = action.payload;
    },
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
    [updateQuest.pending.type]: (state, action) => {
      state.isLoading = true
    },
    [updateQuest.fulfilled.type]: (state, action) => {
      state.isLoading = false
      state.error = ''
    },
    [updateQuest.rejected.type]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    [getQuestStatus.pending.type]: (state, action) => {
      state.isLoading = true
    },
    [getQuestStatus.fulfilled.type]: (state, action) => {
      state.isLoading = false
      state.status = action.payload
      state.error = ''
    },
    [getQuestStatus.rejected.type]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
  }
})

export const {
  addCoupon,
  addSteps,
  addOneStep,
  editStep,
  updateTheme,
  deleteStep,
  updateProfileQuest,
  addFinalQuestMessage
} = currentQuestSlice.actions;
export default currentQuestSlice.reducer;
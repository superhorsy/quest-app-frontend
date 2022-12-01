import {createSlice} from "@reduxjs/toolkit";
import { fetchCreatedQuests, createQuest, deleteQuest } from "../actions/actions";

const initialState = {
  quests: [],
  isLoading: false,
  error: ''
}

const createdQuestsSlice = createSlice({
  name: 'quests',
  initialState,
  reducers: {
    addStep(state, action) {
      const currentQuestId = action.payload.quest_id;
      const currentQuest = state.quests.find(item => item.id === currentQuestId);
      const currentQuestSteps = currentQuest.steps;
      if (currentQuestSteps.length === 0) {
        currentQuestSteps.push(action.payload);
      } else {
        const stepData = action.payload;
        stepData.sort = currentQuestSteps.length + 1;
        currentQuestSteps.push(stepData);
      }
    },
    removeQuests(state, action) {
      state.quests = state.quests.filter(quest => quest.id !== action.payload.id)
    }
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
    },
    [deleteQuest.pending.type]: (state, action) => {
      state.isLoading = true
    },
    [deleteQuest.fulfilled.type]: (state, action) => {
      state.isLoading = false
      state.error = ''
      // state.quests.push(...action.payload)
    },
    [deleteQuest.rejected.type]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
  }
})
export const {addStep, removeQuests} = createdQuestsSlice.actions;
export default createdQuestsSlice.reducer;

import {createSlice} from "@reduxjs/toolkit";
import {fetchCreatedQuests, createQuest, deleteQuest, sendQuest} from "../actions/actions";

const initialState = {
  quests: [],
  isLoading: false,
  error: '',
  sendQuestSuccess: null,
  total: 0,
}

const createdQuestsSlice = createSlice({
  name: 'quests',
  initialState,
  reducers: {
    updateRecipientsInfo(state, action) {
      const currentQuest = state.quests.find(quest => quest.id !== action.payload.questId);
      if(currentQuest.recipients === null) {
        currentQuest.recipients = [];
      } else {
        currentQuest.recipients.push(action.payload.data);
      }
      console.log(action.payload.data);
    },
    hideSendQuestSuccessWindow(state, action) {
      state.sendQuestSuccess = action.payload;
    }
  },
  extraReducers: {
    [fetchCreatedQuests.pending.type]: (state, action) => {
      state.isLoading = true
    },
    [fetchCreatedQuests.fulfilled.type]: (state, action) => {
      state.isLoading = false
      state.error = ''
      // state.total = action.payload.meta.total_count ? action.payload.meta.total_count : 0;
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
export const {updateRecipientsInfo, hideSendQuestSuccessWindow} = createdQuestsSlice.actions;
export default createdQuestsSlice.reducer;

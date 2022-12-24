import { createSlice } from '@reduxjs/toolkit';
import { fetchQuestInfo } from "../actions/actions";

const initialState = {
  quest: [],
  loading: false,
  error: '',
};

const questInfoSlice = createSlice({
  name: 'questInfo',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchQuestInfo.pending.type]: (state, action) => {
      state.loading = true
    },
    [fetchQuestInfo.fulfilled.type]: (state, action) => {
      state.loading = false
      state.error = ''
      console.log(action.payload)
      if (action.payload) {
        state.quest = action.payload;
      }
    },
    [fetchQuestInfo.rejected.type]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
});

export const questInfoReducer = questInfoSlice.reducer;

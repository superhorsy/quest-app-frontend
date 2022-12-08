import { createSlice } from '@reduxjs/toolkit';
import { fetchAvailableQuests } from "../actions/actions";

const initialState = {
  quests: [],
  total: 0,
  loading: false,
  error: '',
};

const questsAvailableSlice = createSlice({
  name: 'questsAvailable',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAvailableQuests.pending.type]: (state, action) => {
      state.loading = true
    },
    [fetchAvailableQuests.fulfilled.type]: (state, action) => {
      state.loading = false
      state.error = ''
      state.total = action.payload.meta.total_count ? action.payload.meta.total_count : 0;
      if (action.payload.data) {
        state.quests.push(...action.payload.data)
      }
    },
    [fetchAvailableQuests.rejected.type]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
});

export const questsAvailableReducer = questsAvailableSlice.reducer;

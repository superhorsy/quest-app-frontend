import {createSlice} from "@reduxjs/toolkit";
import {fetchUserProfile} from "../actions/actions";

const initialState = {
  profile: null,
  isLoading: false,
  error: null,
}

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
  },
  extraReducers: {
    [fetchUserProfile.pending.type]: (state, action) => {
      state.isLoading = true
    },
    [fetchUserProfile.fulfilled.type]: (state, action) => {
      state.isLoading = false
      state.error = ''
      state.profile = action.payload.data
    },
    [fetchUserProfile.rejected.type]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    }
  }
})


export default userProfileSlice.reducer;
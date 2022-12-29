import {createSlice} from "@reduxjs/toolkit";
import {fetchUserProfile, updateUserProfile, changePassword} from "../actions/actions";

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
    },
    [updateUserProfile.pending.type]: (state, action) => {
      state.isLoading = true
    },
    [updateUserProfile.fulfilled.type]: (state, action) => {
      state.isLoading = false
      state.error = ''
      state.profile = action.payload;
    },
    [updateUserProfile.rejected.type]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    [changePassword.pending.type]: (state, action) => {
      state.isLoading = true
    },
    [changePassword.fulfilled.type]: (state, action) => {
      state.isLoading = false
      state.error = ''
      state.profile = action.payload;
    },
    [changePassword.rejected.type]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    }
  }
})

export default userProfileSlice.reducer;
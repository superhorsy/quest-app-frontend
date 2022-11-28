import {createSlice} from "@reduxjs/toolkit";
import {fetchUserProfile} from "../actions/actions";

const initialState = {
  profile: [],
  isLoading: false,
  error: ''
}

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserProfile.pending.type]: (state, action) => {
      state.isLoading = true
    },
    [fetchUserProfile.fulfilled.type]: (state, action) => {
      state.isLoading = false
      state.error = ''
      state.posts.push(...action.payload)
    },
    [fetchUserProfile.rejected.type]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    }
  }
})



export default userProfileSlice.reducer;
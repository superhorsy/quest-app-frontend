import {createSlice} from "@reduxjs/toolkit";
import {uploadFile, getMedia} from "../actions/actions";

export const initialState = {
  media: null,
  isLoading: false,
  error: null,
}

export const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    clearMedia(state) {
      state.media = null
    }
  },
  extraReducers: {
    [uploadFile.pending.type]: (state) => {
      state.isLoading = true
    },
    [uploadFile.fulfilled.type]: (state, action) => {
      state.isLoading = false
      state.error = null
      state.media = action.payload
    },
    [uploadFile.rejected.type]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    [getMedia.pending.type]: (state) => {
      state.isLoading = true
    },
    [getMedia.fulfilled.type]: (state, action) => {
      state.isLoading = false
      state.error = null
      state.media = action.payload
    },
    [getMedia.rejected.type]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
  }
});
export const {clearMedia} = mediaSlice.actions;
export default mediaSlice.reducer;
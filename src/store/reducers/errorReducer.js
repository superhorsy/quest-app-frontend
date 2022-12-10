import {createSlice, isRejected} from "@reduxjs/toolkit";

export const errorSlice =  createSlice({
  name: 'error',
  initialState: {
    message: '',
  },
  reducers: {
    hideError(state) {
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(isRejected, (state, action) => {
      // global error handle reducer
      state.message = typeof(action.payload) === "string" ? action.payload : 'Something went wrong!';
    });
  },
});


export const {hideError} = errorSlice.actions;
export default errorSlice.reducer;

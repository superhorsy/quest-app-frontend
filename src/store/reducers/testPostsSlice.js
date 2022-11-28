import {createSlice} from "@reduxjs/toolkit";
import {testFetchPosts} from "../actions/actions";

const initialState = {
  posts: [],
  isLoading: false,
  error: ''
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [testFetchPosts.pending.type]: (state, action) => {
      state.isLoading = true
    },
    [testFetchPosts.fulfilled.type]: (state, action) => {
      state.isLoading = false
      state.error = ''
      state.posts.push(...action.payload)
    },
    [testFetchPosts.rejected.type]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    }
  }
})

// const isPendingAction = (action) => action.type.endsWith('pending')
// const isRejectedAction = (action) => action.type.endsWith('rejected')
//
// export const postsSlice = createSlice({
//     name: 'posts',
//     initialState,
//     reducers: {},
//     extraReducers: builder => {
//         builder.addCase(
//             testFetchPosts.fulfilled,
//             (state, action) => {
//                 state.isLoading = false
//                 state.error = ''
//                 state.posts.push(...action.payload)
//             }
//         );
//         builder.addMatcher(
//             isPendingAction,
//             (state) => {
//                 state.isLoading = true;
//             }
//         );
//         builder.addMatcher(
//             isRejectedAction,
//             (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload;
//             }
//         )
//     }
// })

export default postsSlice.reducer
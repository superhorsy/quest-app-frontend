import {combineReducers, configureStore} from "@reduxjs/toolkit";
import postsReducer from './reducers/testPostsSlice'

const rootReducer = combineReducers({
    postsReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})

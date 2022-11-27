import {combineReducers, configureStore} from "@reduxjs/toolkit";
import postsReducer from './reducers/testPostsSlice';
import authReducer from "./reducers/authSlice"

const rootReducer = combineReducers({
    postsReducer, authReducer
})

export const store = configureStore({
    reducer: rootReducer,
})

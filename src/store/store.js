import {combineReducers, configureStore} from "@reduxjs/toolkit";
import postsReducer from './reducers/testPostsSlice'
import questExecutionReducer from "./reducers/questExecutionSlice";

const rootReducer = combineReducers({
    postsReducer,
    questExecutionReducer
})

export const store = configureStore({
    reducer: rootReducer,
})

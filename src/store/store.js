import {combineReducers, configureStore} from "@reduxjs/toolkit";
import postsReducer from './reducers/testPostsSlice';
import questsReducer from "./reducers/questsSlice";
import questExecutionReducer from "./reducers/questExecutionSlice";

const rootReducer = combineReducers({
  postsReducer,
  questsReducer,
  questExecutionReducer
})

export const store = configureStore({
  reducer: rootReducer,
})

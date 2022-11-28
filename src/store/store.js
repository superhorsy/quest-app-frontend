import {combineReducers, configureStore} from "@reduxjs/toolkit";
import postsReducer from './reducers/testPostsSlice';
import createdQuestsReducer from "./reducers/createdQuestsSlice";
import questExecutionReducer from "./reducers/questExecutionSlice";
import userProfileReducer from "./reducers/userProfileSlice";

const rootReducer = combineReducers({
  postsReducer,
  createdQuestsReducer,
  questExecutionReducer,
  userProfileReducer
})

export const store = configureStore({
  reducer: rootReducer,
})

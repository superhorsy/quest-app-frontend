import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createdQuestsReducer from "./reducers/createdQuestsSlice";
import questExecutionReducer from "./reducers/questExecutionSlice";
import authReducer from "./reducers/authSlice";
import userProfileReducer from "./reducers/userProfileSlice";
import currentQuestReducer from "./reducers/currentQuestSlice";
import { questsAvailableReducer } from './reducers/availableQuests';

const rootReducer = combineReducers({
  createdQuestsReducer,
  questExecutionReducer,
  userProfileReducer,
  authReducer,
  questsAvailableReducer,
  currentQuestReducer
})

export const store = configureStore({
  reducer: rootReducer,
})

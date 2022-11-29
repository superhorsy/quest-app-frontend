import {combineReducers, configureStore} from "@reduxjs/toolkit";
import postsReducer from './reducers/testPostsSlice';
import questsReducer from "./reducers/questsSlice";
import questExecutionReducer from "./reducers/questExecutionSlice";
import authReducer from "./reducers/authSlice";

const rootReducer = combineReducers({
    postsReducer,
    questsReducer,
    questExecutionReducer,
    authReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})

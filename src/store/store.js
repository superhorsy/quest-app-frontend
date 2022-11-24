import {combineReducers, configureStore} from "@reduxjs/toolkit";
import postsReducer from './reducers/testPostsSlice';
import questsReducer from "./reducers/questsSlice";

const rootReducer = combineReducers({
    postsReducer,
    questsReducer
})

export const store = configureStore({
    reducer: rootReducer,
})

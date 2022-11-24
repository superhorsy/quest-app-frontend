import {createSlice} from "@reduxjs/toolkit";
// import {testFetchPosts} from "../actions/actions";
import { fetchQuests, createQuest } from "../actions/actions";

const initialState = {
    quests: [],
    isLoading: false,
    error: ''
}

const questsSlice = createSlice({
    name: 'quests',
    initialState,
    reducers: {
        addStep(state, action) {
            const currentQuestId = action.payload.quest_id;
            state.quests.find(item => item.id === currentQuestId).steps.push(action.payload);
        }
    },
    extraReducers: {
        [fetchQuests.pending.type]: (state, action) => {
            state.isLoading = true
        },
        [fetchQuests.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.error = ''
            state.quests.push(...action.payload)
        },
        [fetchQuests.rejected.type]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        [createQuest.pending.type]: (state, action) => {
            state.isLoading = true
        },
        [createQuest.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.error = ''
            if (action.payload.data.steps === null) {
                action.payload.data.steps = [];
            }
            state.quests.push(action.payload.data);
        },
        [createQuest.rejected.type]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})
export const {addStep} = questsSlice.actions;
export default questsSlice.reducer;
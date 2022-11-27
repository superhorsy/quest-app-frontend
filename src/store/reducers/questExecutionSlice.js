import {createSlice} from "@reduxjs/toolkit";
import {getInitQuest, getNextQuest} from "../actions/actions";

const initialState = {
    quests: [],
    totalQuestsCount: 0,
    isLoading: false,
    error: ''
}

const questExecutionSlice = createSlice({
    name: 'questExecutionSlice',
    initialState,
    reducers: {},
    extraReducers: {
        [getInitQuest.pending.type]: (state) => {
            state.isLoading = true
        },
        [getInitQuest.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.error = ''
            state.quests.push(...action.payload.quests)
            state.totalQuestsCount = action.payload.totalQuestsCount
        },
        [getInitQuest.rejected.type]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        [getNextQuest.pending.type]: (state) => {
            state.isLoading = true
        },
        [getNextQuest.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.error = ''
            state.quests = [...action.payload]
        },
        [getNextQuest.rejected.type]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

export default questExecutionSlice.reducer
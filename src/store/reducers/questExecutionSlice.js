import {createSlice} from "@reduxjs/toolkit";
import {getInitQuest, getStatusQuest, getNextQuest} from "../actions/actions";

const initialState = {
  // quests: [],
  // totalQuestsCount: 0,
  current: {},       // Текущий шаг квеста
  previous: [],      // Предыдущий шаг квеста
  questionCount: '', // Количество шагов в квесте
  questStatus: null, // Статус квеста (начат/не начат)
  isLoading: false,
  error: '',
}

export const questExecutionSlice = createSlice({
  name: 'questExecutionSlice',
  initialState,
  reducers: {
    clearStateSteps (state) {
      // state = initialState
      state.current = {}
      state.previous = []
      state.questionCount = ''
      state.questStatus = null
      state.isLoading = false
      state.error = ''
    }
  },
  extraReducers: {
    [getInitQuest.pending.type]: (state) => {
      state.isLoading = true
    },
    [getInitQuest.fulfilled.type]: (state, action) => {
      state.isLoading = false
      state.error = ''
      // state.current.push(action.payload.data.current)
      // state.questionCount = action.payload.data.question_count
      state.questStatus = action.payload.data.quest_status
    },
    [getInitQuest.rejected.type]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    [getStatusQuest.pending.type]: (state) => {
      state.isLoading = true
    },
    [getStatusQuest.fulfilled.type]: (state, action) => {
      state.isLoading = false
      state.error = ''
      state.current = action.payload.data.current
      if (action.payload.data.previous) {
        state.previous = [...action.payload.data.previous]
      }
      state.questionCount = action.payload.data.question_count
      state.questStatus = action.payload.data.quest_status
      // state.test = action.payload
    },
    [getStatusQuest.rejected.type]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    [getNextQuest.pending.type]: (state) => {
      state.isLoading = true
    },
    [getNextQuest.fulfilled.type]: (state, action) => {
      state.isLoading = false
      state.error = ''
      state.current = action.payload.data.current
      if (action.payload.data.previous) {
        state.previous = [...action.payload.data.previous]
      }
      if (action.payload.data.quest_status === "finished") {
        state.questStatus = action.payload.data.quest_status
      }
    },
    [getNextQuest.rejected.type]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    }
  }
})

export default questExecutionSlice.reducer
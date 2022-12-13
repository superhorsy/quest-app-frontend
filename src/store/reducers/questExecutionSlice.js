import {createSlice} from "@reduxjs/toolkit";
import {getInitQuest, getStatusQuest, getNextQuest} from "../actions/actions";
import { questStatuses } from "../../constants/constants";

const initialState = {
  // quests: [],
  // totalQuestsCount: 0,
  current: {},       // Текущий шаг квеста
  previous: [],      // Предыдущий шаг квеста
  questionCount: '', // Количество шагов в квесте
  questStatus: null, // Статус квеста (начат/не начат)
  isLoading: false,
  error: '',
  success: true,
  test: [],
  qrCodeAnswer: null,
  questTheme: null,
  notification: {
    "success": false,
    "message": "",
    "visible": false,
  }
}

export const questExecutionSlice = createSlice({
  name: 'questExecutionSlice',
  initialState,
  reducers: {
    addAnswerFromQRCodeReader(state, action) {
      state.qrCodeAnswer = action.payload;
    },
    clearStateSteps (state) {
      // state = initialState
      state.current = {}
      state.previous = []
      state.questionCount = ''
      state.questStatus = null
      state.isLoading = false
      state.error = ''
      state.questTheme = null
    },
    hideAnswerNotification(state) {
      state.notification.visible = false;
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
      state.questTheme = action.payload.data.quest_theme
    },
    [getInitQuest.rejected.type]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
      if(action.payload.data.previous) {
        state.previous = [...action.payload.data.previous]
      }
      if (action.payload.data.quest_status === questStatuses.FINISHED) {
        state.questStatus = action.payload.data.quest_status
      }
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
      state.questTheme = action.payload.data.quest_theme
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
      state.success = action.payload.data.success
      state.notification = {
        "success": Boolean(action.payload.data.success),
        "message": Boolean(action.payload.data.success) ? "Вы ответили верно!" : "Ответ неверный, попробуйте снова",
        "visible": action.payload.data.quest_status !== questStatuses.IN_PROGRESS ? false : true,
      }
      state.current = action.payload.data.current
      state.questStatus = action.payload.data.quest_status
      if (action.payload.data.previous) {
        state.previous = [...action.payload.data.previous]
      }
    },
    [getNextQuest.rejected.type]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    }
  }
})
export const {addAnswerFromQRCodeReader, hideAnswerNotification} = questExecutionSlice.actions;
export default questExecutionSlice.reducer
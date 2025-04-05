import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuizState } from '@/types/quiz';

const initialState: QuizState = {
  currentQuizId: null,
  answers: {},
  currentScreenId: null,
  screenHistory: [],
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    startQuiz: (state, action: PayloadAction<{ quizId: string; firstScreenId: string }>) => {
      state.currentQuizId = action.payload.quizId;
      state.currentScreenId = action.payload.firstScreenId;
      state.answers = {};

    },
    setAnswer: (state, action: PayloadAction<{ screenId: string; answer: string }>) => {
      state.answers[action.payload.screenId] = action.payload.answer;
    },
    setCurrentScreen: (
      state,
      action: PayloadAction<{ screenId: string; addToHistory?: boolean }>,
    ) => {
      if (action.payload.addToHistory && state.currentScreenId) {
        state.screenHistory.push(state.currentScreenId);
      }
      state.currentScreenId = action.payload.screenId;
    },
    goBack: (state) => {
      const previousScreen = state.screenHistory.at(-1);
      if (previousScreen) {
        // Remove the current screen's answer
        if (state.currentScreenId && state.answers[state.currentScreenId]) {
          const answersWithoutCurrent = Object.entries(state.answers).reduce(
            (acc, [key, value]) => (
              key !== state.currentScreenId ? { ...acc, [key]: value } : acc
            ),
            {},
          );
          state.answers = answersWithoutCurrent;
        }

        state.screenHistory = state.screenHistory.slice(0, -1);
        state.currentScreenId = previousScreen;
      }
    },

    resetQuiz: () => {
      return initialState;
    },
  },
});

export const { startQuiz, setAnswer, setCurrentScreen, resetQuiz, goBack } =
  quizSlice.actions;

export default quizSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { questions } from "../api/questions";
import { Question } from "../types/questions";

interface QuestionsState {
  list: Question[];
}

const initialState: QuestionsState = {
  list: questions,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.list = action.payload;
    },
    addQuestion: (state, action: PayloadAction<Question>) => {
      state.list.push(action.payload);
    },
    updateQuestion: (state, action: PayloadAction<Question>) => {
      const { id } = action.payload;
      const existingQuestionIndex = state.list.findIndex(
        (question) => question.id === id
      );
      if (existingQuestionIndex !== -1) {
        state.list[existingQuestionIndex] = action.payload;
      }
    },
    deleteQuestion: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((question) => question.id !== action.payload);
    },
  },
});

export const { setQuestions, addQuestion, updateQuestion, deleteQuestion } = questionsSlice.actions;

export default questionsSlice.reducer;

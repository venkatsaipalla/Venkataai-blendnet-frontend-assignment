import { configureStore } from "@reduxjs/toolkit";
import scoreReducer from "../reducers/scoreSlice";
import questionsReducer from "../reducers/questionsSlice";

const store = configureStore({
  reducer: {
    score: scoreReducer,
    questions: questionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

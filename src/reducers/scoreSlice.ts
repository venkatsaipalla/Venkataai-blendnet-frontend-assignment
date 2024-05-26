import { createSlice } from "@reduxjs/toolkit";

const scoreSlice = createSlice({
  name: "score",
  initialState: {
    value: 0,
  },
  reducers: {
    incrementScore: (state) => {
      state.value += 1;
    },
    resetScore: (state) => {
      state.value = 0;
    },
  },
});

export const { incrementScore, resetScore } = scoreSlice.actions;
export default scoreSlice.reducer;

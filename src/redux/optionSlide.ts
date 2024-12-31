import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Định nghĩa kiểu dữ liệu cho state
interface OptionsState {
  alpha: string;
  level: number;
}

// State ban đầu
const initialState: OptionsState = {
  alpha: "あ",
  level: 5,
};

const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    setAlpha: (state, action: PayloadAction<string>) => {
      state.alpha = action.payload;
    },
    setLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload;
    },
  },
});

export const { setAlpha, setLevel } = optionsSlice.actions;
export default optionsSlice.reducer;

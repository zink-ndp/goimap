import { configureStore } from "@reduxjs/toolkit";
import variablesReducer from "./optionSlide";

export const store = configureStore({
  reducer: {
    options: variablesReducer,
  },
});

// Định nghĩa kiểu RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

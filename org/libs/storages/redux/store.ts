import { appSlice } from "./slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: appSlice.reducer,
  devTools: process.env.NODE_ENV !== "production",
});

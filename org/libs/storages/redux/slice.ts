"use client";
import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { PayloadAction } from "@reduxjs/toolkit";
import { crumbsType, languageType } from "./types";

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCrumbs: (state, action: PayloadAction<crumbsType>) => {
      state.crumbs = action.payload;
    },
    setLanguage: (state, action: PayloadAction<languageType>) => {
      state.language = action.payload;
    },
  },
});

const { setCrumbs, setLanguage } = appSlice.actions;
export { setCrumbs, setLanguage };

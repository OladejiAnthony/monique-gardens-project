//rxslice
import { createSlice } from "@reduxjs/toolkit";

const newSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
  },

  reducers: {
    STORE_NEWS: (state, action) => {
      console.log(action.payload);
      state.news = action.payload.news;
    },
  },
});

export const { STORE_NEWS } = newSlice.actions;

export const selectNews = (state) => state.news.news;

export default newSlice.reducer;

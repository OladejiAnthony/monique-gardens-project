//rxslice
import { createSlice } from "@reduxjs/toolkit";

const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    gallery: [],
  },

  reducers: {
    STORE_GALLERY: (state, action) => {
      console.log(action.payload);
      state.gallery = action.payload.gallery;
    },
  },
});

export const { STORE_GALLERY } = gallerySlice.actions;

export const selectGallery = (state) => state.gallery.gallery;

export default gallerySlice.reducer;

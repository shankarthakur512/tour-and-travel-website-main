import { createSlice } from "@reduxjs/toolkit";

const initialGuideState = {
  newGuide: false,
  userData: null,
};

const GuideSlice = createSlice({
  name: "Guide",
  initialState: initialGuideState,
  reducers: {
    addGuide: (state, action) => {
      console.log(action.payload.userData);
      state.newGuide = true;
      state.userData = action.payload.userData;
    },
    removeGuide: (state) => {
      state.newGuide = false;
      state.userData = null;
    },
  },
});

const initialSearchedGuidesState = {
  guides: [],
};

const searchedGuidesSlice = createSlice({
  name: "searchedGuides",
  initialState: initialSearchedGuidesState,
  reducers: {
    addSearchedGuide: (state, action) => {
        console.log(action.payload)
      state.guides = action.payload.guides;
    },
    removeSearchedGuide: (state, action) => {
      state.guides = state.guides.filter((guide) => guide.id !== action.payload.id);
    },
    clearSearchedGuides: (state) => {
      state.guides = [];
    },
  },
});

export const { addGuide, removeGuide } = GuideSlice.actions;
export const { addSearchedGuide, removeSearchedGuide, clearSearchedGuides } = searchedGuidesSlice.actions;

export const guideReducer = GuideSlice.reducer;
export const searchedGuidesReducer = searchedGuidesSlice.reducer;

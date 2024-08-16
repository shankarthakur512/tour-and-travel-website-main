import { createSlice } from "@reduxjs/toolkit";

const initialState = {
newGuide : false,
userData: null
}

const GuideSlice = createSlice({
    name: "Guide",
    initialState,
    reducers: {
        addGuide: (state, action) => {
            
            console.log(action.payload.userData)
            state.newGuide = true;
            state.userData = action.payload.userData;
        },
        removeGuide: (state) => {
            state.newGuide = false;
            state.userData = null;
        }
     }
})

export const {addGuide, removeGuide} = GuideSlice.actions;

export default GuideSlice.reducer;
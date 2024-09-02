import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trips: [] 
};

const TripSlice = createSlice({
  name: "Trips",
  initialState,
  reducers: {
    addTrip: (state, action) => {
    
      state.trips.push(action.payload.tripData);
    },
    removeTrip: (state, action) => {
      
      state.trips = state.trips.filter(
        (trip) => trip.id !== action.payload.id
      );
    }
  }
});

export const { addTrip, removeTrip } = TripSlice.actions;

export default TripSlice.reducer;

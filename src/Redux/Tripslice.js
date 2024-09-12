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



const tripsArrayInitialState = {
  tripsArray: [], 
};

const TripsArraySlice = createSlice({
  name: "TripsArray",
  initialState: tripsArrayInitialState,
  reducers: {
    setTripsArray: (state, action) => {
      console.log(action.payload.trips)
      state.tripsArray = action.payload.trips;
    },
    clearTripsArray: (state) => {
      state.tripsArray = [];
    },
  },
});

export const { addTrip, removeTrip } = TripSlice.actions;
export const { setTripsArray, clearTripsArray } = TripsArraySlice.actions;

export const tripReducer = TripSlice.reducer;
export const tripsArrayReducer = TripsArraySlice.reducer;
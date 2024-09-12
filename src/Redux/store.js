import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authslice'
import { guideReducer, searchedGuidesReducer } from './GuideSlice.js'
import {tripReducer , tripsArrayReducer} from './Tripslice'
export default configureStore({
  reducer: {
  auth : authReducer,
  Guide : guideReducer,
  searchedGuides: searchedGuidesReducer,
  Trips : tripReducer,
  TripsArray : tripsArrayReducer
  },
})

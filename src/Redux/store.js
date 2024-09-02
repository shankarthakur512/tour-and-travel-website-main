import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authslice'
import GuideReducer from './GuideSlice'
import TripReducer from './Tripslice'
export default configureStore({
  reducer: {
  auth : authReducer,
  Guide : GuideReducer,
  Trips : TripReducer
  },
})

import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authslice'
import GuideReducer from './GuideSlice'
export default configureStore({
  reducer: {
  auth : authReducer,
  Guide : GuideReducer
  },
})

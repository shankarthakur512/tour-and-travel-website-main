import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authslice';
import { guideReducer, searchedGuidesReducer } from './GuideSlice.js';
import { tripReducer, tripsArrayReducer } from './Tripslice';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage, 
  whitelist: ['auth', 'Guide'], 
};

const rootReducer = combineReducers({
  auth: authReducer,
  Guide: guideReducer,
  searchedGuides: searchedGuidesReducer,
  Trips: tripReducer,
  TripsArray: tripsArrayReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);
export default store;

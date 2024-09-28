import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import store, { persistor } from './Redux/store.js'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
   <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
   
  </Provider>,
);

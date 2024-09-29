import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import store, { persistor } from './Redux/store.js'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'; // Import loadStripe

import { Elements } from "@stripe/react-stripe-js";



const stripePromise = loadStripe('pk_test_51PwqcZImFAej7WEqnvCqpCHS7z6wMTG2BAy0EsNORZ1W8HoZD6dop8X05wL2gUoueX2kXFbTqeDifFDw0CHKsXEv00n8lzVP3d');
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
   <PersistGate loading={null} persistor={persistor}>
   <Elements stripe={stripePromise}>
    <App />

  </Elements>,
 
    </PersistGate>
   
  </Provider>,
);

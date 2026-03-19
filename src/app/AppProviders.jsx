import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Elements } from "@stripe/react-stripe-js";

import store, { persistor } from "../Redux/store";
import { ENV_CONFIG } from "../shared/config/env";
import AppToastContainer from "../shared/ui/AppToastContainer";
import ThemeController from "./ThemeController";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(ENV_CONFIG.stripePublishableKey);

const AppProviders = ({ children }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Elements stripe={stripePromise}>
        <ThemeController />
        {children}
        <AppToastContainer />
      </Elements>
    </PersistGate>
  </Provider>
);

export default AppProviders;

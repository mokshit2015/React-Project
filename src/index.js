import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Routing from "./routes";
import { configStore, persistor } from "./store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import "./css/styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configStore({});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routing />
      </PersistGate>
      <ToastContainer theme="colored" />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

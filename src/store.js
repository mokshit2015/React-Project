import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "event",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configStore = (initialState) => {
  const middleware = [thunk];
  middleware.push(createLogger({ collapsed: true }));
  return configureStore({
    reducer: persistedReducer,
    preloadedState: initialState,
    middleware,
  });
};

const persistor = persistStore(configStore({}));

export { configStore, persistor };

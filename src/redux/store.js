import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import userReducer from "./userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";

// Combine reducers (useful if you have multiple slices)
const rootReducer = combineReducers({
  user: userReducer,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // Only persist the user slice
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Prevents Redux Persist warnings
    }),
});

// Create persistor
const persistor = persistStore(store);

export { store, persistor };

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserSlice from "./userSlice";


import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";


// Persist configuration
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  user: UserSlice,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Middleware to check for expired data
const expiryMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  if (state.user && state.user.createdAt) {
    store.dispatch(checkExpiry());
  }
  return next(action);
};

// Configure and create the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(expiryMiddleware), // Add the expiry middleware here
});

// Create the persistor
export const persistor = persistStore(store);

// Export the store as default
export default store;

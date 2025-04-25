import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  data: null, // Store user data
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload; 
    },
    logout: (state) => {
      state.data = null; // Clear user data on logout
    },
  },
});

// Export actions
export const { setUserData, logout } = userSlice.actions;

// Persist configuration for user slice
const persistConfig = {
  key: "user",
  storage,
};

// Export persisted reducer
export default persistReducer(persistConfig, userSlice.reducer);

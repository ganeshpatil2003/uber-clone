import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  captain: null,
  isAuthenticated: false,
};
const captainSlice = createSlice({
  name: "captain",
  initialState,
  reducers: {
    captainLoggedIn: (state, action) => {
      state.captain = action.payload.captain;
      state.isAuthenticated = true;
    },
    captainLoggedOut: (state, action) => {
      state.captain = null;
      state.isAuthenticated = false;
    },
  },
});

export const { captainLoggedIn, captainLoggedOut } = captainSlice.actions;
export const captainReducer = captainSlice.reducer;

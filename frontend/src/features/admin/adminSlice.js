import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  isAdminAuth: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin(state, action) {
      state.admin = action.payload;
      state.isAdminAuth = true;
    },
    logoutAdmin(state) {
      state.admin = null;
      state.isAdminAuth = false;
    },
  },
});

export const { setAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;

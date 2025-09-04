import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: null,
  allServices: [],
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setSelectedService: (state, action) => {
      state.selected = action.payload;
    },
    setAllServices: (state, action) => {
      state.allServices = action.payload;
    },
  },
});

export const { setSelectedService, setAllServices } = serviceSlice.actions;
export default serviceSlice.reducer;

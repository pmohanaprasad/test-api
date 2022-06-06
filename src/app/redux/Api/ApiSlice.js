import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  api: [],
};

const ApiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    fetchData: (state, { payload }) => {
      state.api = payload;
    },
  },
});

export const { fetchData } = ApiSlice.actions;
export const getAllApi = (state) => state.api.api;
export default ApiSlice.reducer;

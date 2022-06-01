import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./Api/ApiSlice";

export const store = configureStore({
  reducer: { api: apiReducer },
});

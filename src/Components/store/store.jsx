import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "../Features/userAuth";

export  const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
  },
});

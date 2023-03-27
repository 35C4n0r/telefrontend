import {configureStore} from "@reduxjs/toolkit";
import statsReducer from "./controller/Redux/dataSlice";
import authReducer from "./controller/Redux/authSlice";

export const store = configureStore({
    reducer: {
        stats: statsReducer,
        auth: authReducer
    }
});
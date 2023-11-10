import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice"
import postReducer from "./reducers/postSlice"

export default configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer
    }
})
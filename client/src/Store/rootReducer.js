import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { captainReducer } from "./slices/captainSlice";

const rootReducer = combineReducers({
    "user" : userReducer,
    "captain" : captainReducer,
});

export {rootReducer};
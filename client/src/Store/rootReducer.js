import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { captainReducer } from "./slices/captainSlice";
import {userApi} from "./apis/userApi"
import { captainApi } from "./apis/captainApi";

const rootReducer = combineReducers({
    "user" : userReducer,
    "captain" : captainReducer,
    [userApi.reducerPath] : userApi.reducer,
    [captainApi.reducerPath] : captainApi.reducer,
});

export {rootReducer};
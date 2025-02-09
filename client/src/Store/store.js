import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { userApi } from "./apis/userApi";
import { captainApi } from "./apis/captainApi";

const store = configureStore({
    reducer  : rootReducer,
    middleware : (defaultMiddelware)=> 
        defaultMiddelware()
        .concat(userApi.middleware,captainApi.middleware)
});

export {store};
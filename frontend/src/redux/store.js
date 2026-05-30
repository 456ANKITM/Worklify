import {configureStore} from "@reduxjs/toolkit";
import { freelancerApi } from "./api/freelancerApi";
import { jobApi } from "./api/jobApi";
import { authApi } from "./api/authApi";
import authReducer from "./slices/authSlice"

export const store = configureStore({
    reducer:{
        auth: authReducer,
        [freelancerApi.reducerPath] : freelancerApi.reducer,
        [jobApi.reducerPath] : jobApi.reducer,
        [authApi.reducerPath] : authApi.reducer

    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(freelancerApi.middleware).concat(jobApi.middleware).concat(authApi.middleware)
})
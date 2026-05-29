import {configureStore} from "@reduxjs/toolkit";
import { freelancerApi } from "./api/freelancerApi";
import { jobApi } from "./api/jobApi";
import { authApi } from "./api/authApi";

export const store = configureStore({
    reducer:{
        [freelancerApi.reducerPath] : freelancerApi.reducer,
        [jobApi.reducerPath] : jobApi.reducer,
        [authApi.reducerPath] : authApi.reducer

    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(freelancerApi.middleware).concat(jobApi.middleware).concat(authApi.middleware)
})
import {configureStore} from "@reduxjs/toolkit";
import { freelancerApi } from "./api/freelancerApi";
import { jobApi } from "./api/jobApi";

export const store = configureStore({
    reducer:{
        [freelancerApi.reducerPath] : freelancerApi.reducer,
        [jobApi.reducerPath] : jobApi.reducer

    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(freelancerApi.middleware).concat(jobApi.middleware)
})
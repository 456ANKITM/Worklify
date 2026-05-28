import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const freelancerApi = createApi({
    reducerPath:"freelancerApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/freelancer`,
        credentials:'include'
    }),
    endpoints:(builder) => ({
        searchFreelancer: builder.query({
            query: (q) => ({
                url:`/search?q=${q}`
            })
        })
    })
})

export const {useSearchFreelancerQuery}  = freelancerApi
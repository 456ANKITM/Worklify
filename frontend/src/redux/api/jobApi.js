import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const jobApi = createApi({
    reducerPath:"jobApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/job`,
        credentials:'include'
    }),
    endpoints: (builder) => ({
        searchJobs: builder.query({
            query: (q) => ({
                url:`/searchJobs?q=${q}`
            })
        }),
        getAllJobs: builder.query({
            query:() => ({
                url:'/getAllJobs'
            })
        })
    })
})

export const {useSearchJobsQuery, useGetAllJobsQuery} = jobApi
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
        }),
        getJobsByCategory: builder.query({
            query: (category) => ({
                url:`/category?category=${category}`
            })
        }),
        getJobsByProfile: builder.query({
            query:() => ({
                url:'/getJobsByProfile'
            })
        })
    })
})

export const {useSearchJobsQuery, useGetAllJobsQuery, useGetJobsByCategoryQuery, useGetJobsByProfileQuery} = jobApi
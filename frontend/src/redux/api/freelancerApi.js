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
        }),
        getTopFreelancers: builder.query({
            query: () => ({
                url:"/top-by-category"
            })
        }),
        updateBasicProfile: builder.mutation({
            query:(data) => ({
                url:"/update/basic-profile",
                method:"POST",
                body:data
            })
        }),
        addSkills: builder.mutation({
            query:(skills) => ({
                url:"/addSkills",
                method:"POST",
                body:skills
            })
        }),
        addCategory: builder.mutation({
            query:(category) => ({
                url:"/addCategory",
                method:"POST",
                body:category
            })
        }),

    })
})

export const {useSearchFreelancerQuery, useGetTopFreelancersQuery, useUpdateBasicProfileMutation, useAddSkillsMutation, useAddCategoryMutation}  = freelancerApi
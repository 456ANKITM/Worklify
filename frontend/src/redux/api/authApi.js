import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/auth`,
        credentials:'include',
    }),
    endpoints: (builder) => ({
        signupFreelancer:builder.mutation({
            query: (data) => ({
                url:"/signup",
                method:'POST',
                body:data
            })
        })
    })
})

export const {useSignupFreelancerMutation} = authApi
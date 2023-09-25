/** @format */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "register",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://authentication-api-o8vb.onrender.com",
        credentials: "include",
    }),
    tagTypes: ['Auth'],
    prepareHeaders: (headers) => {
        headers.set("Access-Control-Allow-Origin", "*");
        return headers;
    },
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (body) => ({
                url: "/user/register",
                method: "POST",
                body,
            }),
        }),
        loginUser: builder.mutation({
            query: (body) => ({
                url: "/user/login",
                method: "POST",
                body,
            }),
        }),
        getUser: builder.query({
            query: () => '/user/',
            providesTags: ['Auth']
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/user/logout',
                method: "POST"
            })
        })

    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useGetUserQuery,
    useLogoutUserMutation
} = authApi;

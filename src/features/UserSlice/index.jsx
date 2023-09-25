import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://authentication-api-o8vb.onrender.com',
        credentials: 'include'
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        deleteAccount: builder.mutation({
            query: (ID) => ({
                url: `user/delete/account/${ID}`,
                method: "DELETE",
            })
        }),
        updateUser: builder.mutation({
            query: ({ id, formData }) => ({
                url: `user/update-profile/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['User']
        }),
        changePassword: builder.mutation({
            query: ({ id, password }) => ({
                url: `user/update-password/${id}`,
                method: 'PUT',
                body: password,
            }),
        }),
        getUserById: builder.query({
            query: (id) => `user/${id}`,
            providesTags: ['User']
        }),
    })
});

export const { useDeleteAccountMutation, useUpdateUserMutation, useGetUserByIdQuery, useChangePasswordMutation, } = userApi
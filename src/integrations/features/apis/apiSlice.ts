import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const base_url = 'http://localhost:8000'
// export const base_url = "https://211c0d351888.ngrok-free.app"
export const baseUrl = `${base_url}/api`


export const moneyExchangeApi = createApi({
    reducerPath: 'moneyExchangeApi',
    baseQuery: fetchBaseQuery({ baseUrl,
            prepareHeaders(headers) {
                    if (!headers.get("Content-Type")) {
                        headers.set("Content-Type", "application/json")
                }
                // headers.set("x-vercel-protection-bypass", "N4v38tw1rJLlXWA82X4JEFwfitPtOHcW")

                
                return headers
        }
    }),
    
    tagTypes: ['userlogin','addpayments', 'exchange'],
        endpoints: (builder) => ({

                login: builder.mutation({
                        query: data => ({
                                url: "/login",
                                method: "POST",
                                body: data
                        }),
                        // transformResponse : (response,meta,arg) => response.data,
                        // transformErrorResponse : response => response.status,
                        invalidatesTags: ['userlogin']
                }),

                registerUser: builder.mutation({
                        query: data => ({
                                url: "/register",
                                method: "POST",
                                body: data
                        }),
                        // transformResponse : (response,meta,arg) => response.data,
                        // transformErrorResponse : response => response.status,
                        invalidatesTags: ['userlogin']
                }),

                logout: builder.mutation({
                        query: token => ({
                                url: `/logout`,
                                headers: { "Authorization": `Token ${token}` },
                                method: "POST",
                                body: {usertoken:token}
                        }),
                }),

                customer: builder.mutation({
                        query: data => ({
                                url: `/customer`,
                                headers: { "Authorization": `Token ${data.token}` },
                                method: "POST",
                                body: data.data,
                        }),
                }),

                getCustomer: builder.query({
                        query: token => ({
                                url: `/customer`,
                                headers: { "Authorization": `Token ${token}` },
                                method: "GET",
                        }),
                }),

                payee: builder.mutation({
                        query: data => ({
                                url: `/payee`,
                                headers: { "Authorization": `Token ${data.token}` },
                                method: "POST",
                                body: data.data,
                        }),
                }),

                getPayee: builder.query({
                        query: token => ({
                                url: `/payee`,
                                headers: { "Authorization": `Token ${token}` },
                                method: "GET",
                        }),
                }),

                getExchange: builder.query({
                        query: data => ({
                                url: `/exchange?${data.action}=${data.data}&action=${data.action}`,
                                headers: { "Authorization": `Token ${data.token}` },
                                method: "GET",
                        }),
                        providesTags: ['exchange']
                }),

                exchange: builder.mutation({
                        query: data => ({
                                url: `/exchange`,
                                headers: {
                                         "Authorization": `Token ${data.token}`,
                                         "Content-Type": "multipart/form-data; boundary=---->",

                        
                        },
                                method: "POST",
                                body: data.data,
                        }),
                }),

                getPayments: builder.query({
                        query: data => ({
                                url: `/payment?transaction_id=${data.transaction_id}`,
                                headers: { "Authorization": `Token ${data.token}` },
                                method: "GET",
                        }),
                }),

                payment: builder.mutation({
                        query: data => ({
                                url: `/payment`,
                                headers: {
                                         "Authorization": `Token ${data.token}`,            
                        },
                                method: "POST",
                                body: data.data,
                        }),
                        invalidatesTags: ['exchange']
                }),

                analytics: builder.mutation({
                        query: data => ({
                                url: `/analytics`,
                                headers: {
                                         "Authorization": `Token ${data.token}`,            
                        },
                                method: "POST",
                                body: data.data,
                        }),
                }),
    }),
})

export const {
    useLoginMutation, useRegisterUserMutation,
    useLogoutMutation,useCustomerMutation, 
    useExchangeMutation,useGetCustomerQuery,
    useGetPayeeQuery,useGetExchangeQuery,
    useLazyGetCustomerQuery,useLazyGetPayeeQuery,
    usePayeeMutation, useLazyGetExchangeQuery,
    useGetPaymentsQuery,usePaymentMutation,
    useAnalyticsMutation
} = moneyExchangeApi

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subscriptionsApi = createApi({
  reducerPath: "subscriptionsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API}` ,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSubscriptions: builder.query({
      query: ({ degree_type_name, id }) =>
        `subscriptions?degree_type_name=${degree_type_name}&id=${id}`,
    }),
    getPlanDetails:builder.query({
      query:()=>({
        url:'seeders?subscriptionPlan=true',
        method:"GET"
      })
    })
  }),
});

export const { useGetSubscriptionsQuery ,useGetPlanDetailsQuery} = subscriptionsApi;

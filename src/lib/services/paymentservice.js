import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllPayments: builder.query({
      query: ({
        limit,
        page,
        paymentMethod,
        status,
        coupon,
        sortDirection,
        sortBy,
        subscriptionPlanId
      }) =>
        `offline-payments?limit=${limit}&page=${page}&paymentMethod=${paymentMethod}&status=${status}&coupon=${coupon}&sortDirection=${sortDirection}&sortBy=${sortBy}&subscriptionPlanId=${subscriptionPlanId}`,
    }),
  }),
});

export const { useGetAllPaymentsQuery } = paymentApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentDropdownApi = createApi({
  reducerPath: "paymentDropdownApi",
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
    getAllPaymentDropdowns: builder.query({
      query: () =>
        `seeders?paymentMethod=true&status=true&employee=true&coupon=true&degreeType=true&subscriptionPlan=true`,
    }),
  }),
});

export const { useGetAllPaymentDropdownsQuery } = paymentDropdownApi;

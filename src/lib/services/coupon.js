import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CouponRegister = createApi({
  reducerPath: "CouponRegister",
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
    createCoupon: builder.mutation({
      query: (coupon) => ({
        url: "/coupons",
        method: "POST",
        body: coupon,
      }),
    }),
    coupondetails: builder.query({
      query: ({ limit, page }) => ({
        url: `/coupons?limit=${limit}&page=${page}`,
        method: "GET",
      }),
    }),
    coupondeleted: builder.mutation({
      query: (id) => ({
        url: `/coupons/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCouponMutation,
  useCoupondetailsQuery,
  useCoupondeletedMutation,
  useCouponeditMutation,
} = CouponRegister;

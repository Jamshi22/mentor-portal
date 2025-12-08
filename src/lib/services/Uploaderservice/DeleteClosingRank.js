import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const base_url = process.env.NEXT_PUBLIC_BASE_URL_UPLOADS
const base_url = process.env.NEXT_PUBLIC_BASE_URL_UPLOADS

export const ClosingRankRTK = createApi({
  reducerPath: 'DeleteClosingRank',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getDynamicDropdowns: builder.mutation({
      query: (body) => ({
        // url: 'http://147.93.110.229:8008/api/v1/closing-rank/dynamic-drop-down',
         url: `${base_url}closing-rank/dynamic-drop-down`,
        method: 'POST',
        body,
      }),
    }),

    getClosingRankData: builder.mutation({
      query: (body) => ({

        // url: 'http://147.93.110.229:8008/api/v1/closing-rank',
        url: `${base_url}closing-rank`,
        method: 'POST',
        body,
      }),
    }),

    deleteClosingRankData: builder.mutation({
      query: (body) => ({
        // url: 'http://147.93.110.229:8008/api/v1/excelUploads/delete-rank',
           url: `${base_url}excelUploads/delete-rank`,
        method: 'DELETE',
        body,
      }),
    }),
  }),
});

export const {
  useGetDynamicDropdownsMutation,
  useGetClosingRankDataMutation,
  useDeleteClosingRankDataMutation,
} = ClosingRankRTK;

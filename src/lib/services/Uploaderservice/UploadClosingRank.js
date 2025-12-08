import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const base_url_uploads = process.env.NEXT_PUBLIC_BASE_URL_UPLOADS;
const base_url_mongodb = process.env.NEXT_PUBLIC_UPLOAD_MONGODB;

export const UploadClosingRankRTK = createApi({
  reducerPath: 'UploadClosingRank',
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
    uploadRankDetails: builder.mutation({
      query: (formData) => ({
        // url: 'https://uploader.hellomentor.online/api/v1/excelUploads/rank-details',
        url: `${base_url_uploads}excelUploads/rank-details`,
        method: 'POST',
        body: formData,
      }),
    }),
    feeStipendBondUploader: builder.mutation({
      query: (formData) => ({
        // url: 'https://uploader.hellomentor.online/api/v1/excelUploads/feeStipendBond-details',
        // url: "http://localhost:8008/api/v1/excelUploads/feeStipendBond-details",
        url: `${base_url_uploads}excelUploads/feeStipendBond-details`,
        method: 'POST',
        body: formData,
      }),
    }),
    seatMatrixFilter: builder.mutation({
      query: (payload) => ({
        // url: 'http://localhost:8001/apim/v1/seat-matrix/filters',
        url: `${base_url_mongodb}seat-matrix/filters`,
        method: 'POST',
        body: payload,
      }),
    }),
    // ✅ NEW: Fetch all seat matrix states
    seatMatrixStates: builder.query({
      query: ({ counsellingType = 'State', degreeType = 'UG', view = 'table' }) => ({
        // url: 'http://localhost:8001/apim/v1/seat-matrix/states',
        url: `${base_url_mongodb}seat-matrix/states`,
        method: 'GET',
        params: {
          counsellingType,
          degreeType,
          view,
        },
      }),
    }),
    seatMatrixSearch: builder.mutation({
      query: (payload) => ({
        // url: 'http://localhost:8001/apim/v1/seat-matrix/',
        url: `${base_url_mongodb}seat-matrix/`,
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response) => response, // ✅ add this
    }),
    seatMatrixSearchDelete: builder.mutation({
      query: (payload) => ({
        // url: "http://localhost:8001/apim/v1/seat-matrix/custom-del/",
        url: `${base_url_mongodb}seat-matrix/custom-del/`,
        method: "POST",
        body: payload
      })
    }),
    feeStipendBondDelete: builder.mutation({
      query: (payload) => ({
        // url: "http://localhost:8008/api/v1/excelUploads/delete-fee-stipend-bond",
         url:`${base_url_uploads}excelUploads/delete-fee-stipend-bond`,
        method: "DELETE",
        body: payload
      })
    })
  }),
});

export const {
  useUploadRankDetailsMutation,
  useFeeStipendBondUploaderMutation,
  useSeatMatrixFilterMutation,
  useSeatMatrixStatesQuery,
  useSeatMatrixSearchMutation, // ✅ add this
  useSeatMatrixSearchDeleteMutation,
  useFeeStipendBondDeleteMutation
} = UploadClosingRankRTK;

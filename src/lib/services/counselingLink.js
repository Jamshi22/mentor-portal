import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const CounselingLinkRTK = createApi({
  reducerPath: 'counselingLink',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['CounselingLinks'], 
  endpoints: (builder) => ({
    getCounselingLink: builder.query({
      query: () => `counsellingLink/counselling-links`,
      providesTags: ['CounselingLinks'], 
    }),

    getStateCounseling: builder.query({
      query: () => `seeders?state=true&degreeType=true`,
    }),

    addCounselingLink: builder.mutation({
      query: (addCounselingLink) => ({
        url: `counsellingLink/add-counselling-link`,
        method: "POST",
        body: addCounselingLink,
      }),
      invalidatesTags: ['CounselingLinks'], 
    }),

    updateCounselingLink: builder.mutation({
      query: ({ id, updateCounseling }) => ({
        url: `counsellingLink/update-counselling-links/${id}`,
        method: "PUT",
        body: updateCounseling,
      }),
      invalidatesTags: ['CounselingLinks'], 
    }),

    deleteCounselingLink: builder.mutation({
      query: (id) => ({
        url: `counsellingLink/delete-counselling-links/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['CounselingLinks'], 
    }),
  }),
});

export const {
  useGetCounselingLinkQuery,
  useAddCounselingLinkMutation,
  useUpdateCounselingLinkMutation,
  useDeleteCounselingLinkMutation,
  useGetStateCounselingQuery,
} = CounselingLinkRTK;

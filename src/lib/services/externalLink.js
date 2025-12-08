import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ExpertVideoRTK = createApi({
  reducerPath: "expertVideoRTK",
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
    getExpertLink: builder.query({
      query: () => `/explained-by-experts/`,
    }),

    getStateExpertVideoState: builder.query({
      query: () => `seeders?state=true&degreeType=true`,
    }),

    addExpertVideo: builder.mutation({
      query: (addexpertvideos) => ({
        url: `/explained-by-experts/`,
        method: "POST",
        body: addexpertvideos,
      }),
    }),

    updateExpertVideo: builder.mutation({
      query: ({ id, updatesexpertvideo }) => ({
        url: `/explained-by-experts/${id}`,
        method: "PUT",
        body: updatesexpertvideo,
      }),
    }),

    deleteExpertVideo: builder.mutation({
      query: (id) => ({
        url: `/explained-by-experts/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetExpertLinkQuery,
  useGetStateExpertVideoStateQuery,
  useAddExpertVideoMutation,
  useUpdateExpertVideoMutation,
  useDeleteExpertVideoMutation,
} = ExpertVideoRTK;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const webinarApi = createApi({
  reducerPath: "webinarApi",
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
    getUpcomingWebinar: builder.query({
      query: ({ limit, page }) =>
        // `/webinar/get-webinar?limit=${limit}&page=${page}`,
        `/hm-webinar?limit=${limit}&page=${page}`,
    }
    ),
    getStatesDegreeType: builder.query({
      query: () => `seeders?state=true&degreeType=true`,
    }),
    addWebinar: builder.mutation({
      query: (createWebinar) => ({
        // url: "/webinar/add-webinar",
        url: "/hm-webinar/",
        method: "POST",
        body: createWebinar,
      }),
    }),
    updateWebinar: builder.mutation({
      query: ({ id, updateWebinardata }) => ({
        // url: `/webinar/webinar/${id}`,
        url: `/hm-webinar/${id}`,
        method: "PUT",
        body: updateWebinardata,
      }),
    }),
    deleteWebinar: builder.mutation({
      query: (id) => ({
        // url: `/webinar/webinar/${id}`,
           url: `/hm-webinar/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUpcomingWebinarQuery,
  useAddWebinarMutation,
  useGetStatesDegreeTypeQuery,
  useUpdateWebinarMutation,
  useDeleteWebinarMutation,
} = webinarApi;

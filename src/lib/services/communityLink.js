import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CommunityLinkRTK = createApi({
  reducerPath: "communityLink",
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
    getCommunityLink: builder.query({
      query: () => `community`,
    }),

    getStatesDegreeTyperecorded: builder.query({
      query: () => `seeders?state=true&degreeType=true`,
    }),

    addCommunityLink: builder.mutation({
      query: (addcommunity) => ({
        url: `/community/`,
        method: "POST",
        body: addcommunity,
      }),
    }),

    updateCommunityLink: builder.mutation({
      query: ({ id, updateCommunityLink }) => ({
        url: `/community/${id}`,
        method: "PUT",
        body: updateCommunityLink,
      }),
    }),

    deletecommunityLink: builder.mutation({
      query: (id) => {
        // console.log("Deleting community with ID:", id);
        return {
          url: `community/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetCommunityLinkQuery,
  useAddCommunityLinkMutation,
  useDeletecommunityLinkMutation,
  useUpdateCommunityLinkMutation,
  useGetStatesDegreeTyperecordedQuery,
} = CommunityLinkRTK;

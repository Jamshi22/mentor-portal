import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsAndUpdatesRTK = createApi({
  reducerPath: "news",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_UPLOAD_MONGODB}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // GET news by state
    //new cmnt
    
    getNewsByState: builder.query({
      query: ({ state, degree_type }) => `news-and-update/getByState/${state}?degree_type=${degree_type}`,
    }),

    // POST upload news
    uploadNews: builder.mutation({
      query: (newsData) => ({
        url: `news-and-update`,
        method: "POST",
        body: newsData,
      }),
    }),

     // PUT edit news
    editNews: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `news-and-update/${id}`,
        method: "PUT",
        body: updatedData,
      }),
    }),

  }),
});

export const { 
  useGetNewsByStateQuery, 
  useUploadNewsMutation,
  useEditNewsMutation,

} = newsAndUpdatesRTK;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API}employees`,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (user) => {
        return {
          url: `login`,
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
          credential: "include",
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginUserMutation } = authApi;

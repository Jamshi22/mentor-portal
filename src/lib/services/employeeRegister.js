import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const EmployeeRegister = createApi({
  reducerPath: "EmployeeRegister",
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
    registerUser: builder.mutation({
      query: (employeeRegister) => ({
        url: "employees/register",
        method: "POST",
        body: employeeRegister,
      }),
    }),
    employedetails: builder.query({
      query: ({ limit, page }) => ({
        url: `employees?limit=${limit}&page=${page}`,
        method: "GET",
      }),
    }),
    employedelete: builder.mutation({
      query: (id) => ({
        url: `employees/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useEmployedetailsQuery,
  useEmployedeleteMutation,
} = EmployeeRegister;

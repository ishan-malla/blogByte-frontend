// src/features/auth/authApi.ts
import { apiSlice } from "../api/apiSlice";

interface LoginRequest {
  // email: string;
  password: string;
  username: string;
}

interface LoginResponse {
  access_token: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    register: builder.mutation<LoginResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;

export default authApi;

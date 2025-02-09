import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { captainLoggedIn, captainLoggedOut } from "../slices/captainSlice";

const CAPTAIN_URL = "http://localhost:8000/api1/v1/captains";
export const captainApi = createApi({
  reducerPath: "captainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: CAPTAIN_URL,
    credentials: true,
  }),
  endpoints: (builder) => ({
    captainRegister: builder.mutation({
      query: (inputData) => ({
        url: "/register",
        method: "POST",
        body: inputData,
      }),
    }),
    captainLogIn: builder.mutation({
      query: (inputData) => ({
        url: "/login",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(captainLoggedIn({ captain: result.data.data }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    captainLogOut: builder.mutation({
      query: (inputData) => ({
        url: "/logout",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(captainLoggedOut());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getCaptain: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(captainLoggedIn({ captain: result.data.data }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useCaptainLogInMutation,
  useCaptainRegisterMutation,
  useCaptainLogOutMutation,
  useGetCaptainQuery,
} = captainApi;

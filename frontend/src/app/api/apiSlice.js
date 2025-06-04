import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    // Handle token refresh logic here if needed
    console.log("Sending refresh token");
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      // Store the new token in the state
      api.dispatch(setCredentials({ ...refreshResult.data }));
      // Retry the original query with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message =
          "Your session has expired. Please log in again.";
      }
      return refreshResult; // Return the error from the refresh attempt
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});

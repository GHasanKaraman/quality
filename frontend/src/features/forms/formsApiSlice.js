import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "../../app/api/apiSlice";

const formsAdapter = createEntityAdapter({});
const initialState = formsAdapter.getInitialState();

export const formsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getForms: builder.query({
      query: () => "/forms",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedForms = responseData.map((form) => {
          form.id = form._id;
          return form;
        });
        return formsAdapter.setAll(initialState, loadedForms);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Form", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Form", id })),
          ];
        } else return [{ type: "Form", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetFormsQuery } = formsApiSlice;

export const selectFormsResult = formsApiSlice.endpoints.getForms.select();

export const selectFormsData = createSelector(
  selectFormsResult,
  (formsResult) => formsResult.data
);

export const {
  selectAll: selectAllForms,
  selectById: selectFormById,
  selectIds: selectFormIds,
} = formsAdapter.getSelectors(
  (state) => selectFormsData(state) ?? initialState
);

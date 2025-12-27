import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../../shared';

import { authLogin, postReview } from '../../async-action';

import { initialState } from './state';

export const errorData = createSlice({
  name: NameSpace.ErrorData,
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(postReview.fulfilled, (state) => {
        state.error = null;
      });
  },
});

export const { setError, clearError } = errorData.actions;


import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../../shared';

import { fetchFavorites, authLogout } from '../../async-action';

import { initialState } from './state';

export const favoritesData = createSlice({
  name: NameSpace.FavoritesData,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.areFavoritesLoading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.areFavoritesLoading = false;
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.areFavoritesLoading = false;
      })
      .addCase(authLogout.fulfilled, (state) => {
        state.favorites = [];
        state.areFavoritesLoading = false;
      });
  },
});


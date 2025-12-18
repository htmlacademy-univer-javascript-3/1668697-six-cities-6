import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../../shared';

import { fetchCurrentOffer, fetchReviews, fetchNearby, changeFavoriteStatus } from '../../async-action';

import { initialState } from './state';

export const currentOfferData = createSlice({
  name: NameSpace.CurrentOfferData,
  initialState,
  reducers: {
    setCurrentOfferId: (state, action: PayloadAction<string>) => {
      state.currentOfferId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentOffer.pending, (state) => {
        state.isCurrentOfferLoading = true;
      })
      .addCase(fetchCurrentOffer.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isCurrentOfferLoading = false;
      })
      .addCase(fetchCurrentOffer.rejected, (state) => {
        state.isCurrentOfferLoading = false;
      })

      .addCase(fetchReviews.pending, (state) => {
        state.isCurrentOfferLoading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.currentOfferReviews = action.payload;
        state.isCurrentOfferLoading = false;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.isCurrentOfferLoading = false;
      })

      .addCase(fetchNearby.pending, (state) => {
        state.isCurrentOfferLoading = true;
      })
      .addCase(fetchNearby.fulfilled, (state, action) => {
        state.currentOfferNearby = action.payload;
        state.isCurrentOfferLoading = false;
      })
      .addCase(fetchNearby.rejected, (state) => {
        state.isCurrentOfferLoading = false;
      })

      .addCase(changeFavoriteStatus.fulfilled, (state, action) => {
        const updatedOffer = action.payload;

        if (state.currentOffer && state.currentOffer.id === updatedOffer.id) {
          state.currentOffer.isFavorite = updatedOffer.isFavorite;
        }

        const nearbyIndex = state.currentOfferNearby.findIndex((offer) => offer.id === updatedOffer.id);
        if (nearbyIndex >= 0) {
          state.currentOfferNearby[nearbyIndex].isFavorite = updatedOffer.isFavorite;
        }
      });
  },
});

export const { setCurrentOfferId } = currentOfferData.actions;

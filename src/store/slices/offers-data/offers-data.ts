import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { OffersSortType } from '../../../shared';
import { NameSpace } from '../../../shared';

import { initialState } from './state';
import { fetchOffers, changeFavoriteStatus, authLogout, fetchFavorites } from '../../async-action';

export const offersData = createSlice({
  name: NameSpace.OffersData,
  initialState,
  reducers: {
    setOffersSortType: (state, action: PayloadAction<OffersSortType>) => {
      state.offersSortType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.areOffersLoading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.areOffersLoading = false;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.areOffersLoading = false;
      })
      .addCase(changeFavoriteStatus.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        const offerIndex = state.offers.findIndex((offer) => offer.id === updatedOffer.id);

        if (offerIndex >= 0) {
          state.offers[offerIndex].isFavorite = updatedOffer.isFavorite;
        }
      })
      .addCase(authLogout.fulfilled, (state) => {
        state.offers.forEach((offer) => {
          offer.isFavorite = false;
        });
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        const favoriteIds = new Set(action.payload.map((favorite) => favorite.id));
        state.offers.forEach((offer) => {
          offer.isFavorite = favoriteIds.has(offer.id);
        });
      });
  },
});

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { OffersSortType } from '../../../shared';
import { NameSpace } from '../../../shared';

import { initialState } from './state';
import { fetchOffers } from '../../async-action';

export const offersData = createSlice({
  name: NameSpace.OffersData,
  initialState,
  reducers: {
    setOffersSortType: (state, action: PayloadAction<OffersSortType>) => {
      state.offersSortType = action.payload;

      const offersToSort = [...state.offers];

      switch (action.payload) {
        case OffersSortType.Popular:
          state.offers = offersToSort;
          break;
        case OffersSortType.PriceLowToHigh:
          state.offers = offersToSort.sort((a, b) => a.price - b.price);
          break;
        case OffersSortType.PriceHightToLow:
          state.offers = offersToSort.sort((a, b) => b.price - a.price);
          break;
        case OffersSortType.TopRated:
          state.offers = offersToSort.sort((a, b) => b.rating - a.rating);
          break;
        default:
          state.offers = offersToSort;
          break;
      }
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
      });
  },
});

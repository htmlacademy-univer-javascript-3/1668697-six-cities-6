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

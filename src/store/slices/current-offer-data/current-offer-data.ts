import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IDetailedOfferInfo, IOfferReview, ISimpleOfferInfo } from '../../../shared';
import { NameSpace } from '../../../shared';

import { initialState } from './state';

export const currentOfferData = createSlice({
  name: NameSpace.CurrentOfferData,
  initialState,
  reducers: {
    setCurrentOffer: (state, action: PayloadAction<IDetailedOfferInfo>) => {
      state.currentOffer = action.payload;
    },
    setIsCurrentOfferLoading: (state, action: PayloadAction<boolean>) => {
      state.isCurrentOfferLoading = action.payload;
    },
    setCurrentOfferId: (state, action: PayloadAction<string>) => {
      state.currentOfferId = action.payload;
    },
    setCurrentOfferReviews: (state, action: PayloadAction<IOfferReview[]>) => {
      state.currentOfferReviews = action.payload;
    },
    setCurrentOfferNearbyOffers: (state, action: PayloadAction<ISimpleOfferInfo[]>) => {
      state.currentOfferNearby = action.payload;
    },
  },
});

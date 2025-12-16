import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ISimpleOfferInfo, OffersSortType } from '../../../shared';
import { NameSpace } from '../../../shared';

import { initialState } from './state';

export const offersData = createSlice({
  name: NameSpace.OffersData,
  initialState,
  reducers: {
    setOffers: (state, action: PayloadAction<ISimpleOfferInfo[]>) => {
      state.offers = action.payload;
    },
    setAreOffersLoading: (state, action: PayloadAction<boolean>) => {
      state.areOffersLoading = action.payload;
    },
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
});

import { createReducer } from '@reduxjs/toolkit';

import { InitialStateType, OffersSortType } from '../shared';

import {
  setCity,
  setOffers,
  setCurrentOfferId,
  changeOffersSortType,
  setIsLoading
} from './action';

const initialState: InitialStateType = {
  offers: [],
  isLoading: true,
  currentOfferId: '',
  offersSortType: OffersSortType.Popular,
  city: { name: '', location: { latitude: 0, longitude: 0, zoom: 0 } },
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, { payload }) => {
      state.city = payload;
    })
    .addCase(setOffers, (state, { payload }) => {
      state.offers = payload;
    })
    .addCase(setCurrentOfferId, (state, { payload }) => {
      state.currentOfferId = payload;
    })
    .addCase(changeOffersSortType, (state, { payload }) => {
      state.offersSortType = payload;

      const offersToSort = [...state.offers];

      switch (payload) {
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
    })
    .addCase(setIsLoading, (state, { payload }) => {
      state.isLoading = payload;
    });
});

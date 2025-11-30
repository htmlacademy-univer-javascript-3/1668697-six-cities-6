import { createReducer } from '@reduxjs/toolkit';

import { OfferCity, InitialStateType, SortType } from '../shared';
import { offerMocks } from '../mocks';

import { changeCity, setOffers, setCurrentOfferId, changeOffersSortType } from './action';

const stateType: InitialStateType = {
  city: OfferCity.Paris,
  offers: offerMocks,
  currentOfferId: undefined,
  offersSortType: SortType.Popular
};

export const reducer = createReducer(stateType, (builder) => {
  builder
    .addCase(changeCity, (state, { payload }) => {
      state.city = payload;
    })
    .addCase(setOffers, (state) => {
      state.offers = offerMocks;
    })
    .addCase(setCurrentOfferId, (state, { payload }) => {
      state.currentOfferId = payload;
    })
    .addCase(changeOffersSortType, (state, { payload }) => {
      state.offersSortType = payload;

      const offersToSort = [...offerMocks];

      switch (payload) {
        case SortType.Popular:
          state.offers = offersToSort;
          break;
        case SortType.PriceLowToHigh:
          state.offers = offersToSort.sort((a, b) => a.info.price - b.info.price);
          break;
        case SortType.PriceHightToLow:
          state.offers = offersToSort.sort((a, b) => b.info.price - a.info.price);
          break;
        case SortType.TopRated:
          state.offers = offersToSort.sort((a, b) => b.info.rating - a.info.rating);
          break;
        default:
          state.offers = offersToSort;
          break;
      }
    });
});

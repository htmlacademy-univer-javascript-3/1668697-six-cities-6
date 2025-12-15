import { createReducer } from '@reduxjs/toolkit';

import { InitialStateType, OffersSortType, AuthStatus } from '../shared';

import {
  setCity,
  setOffers,
  setCurrentOfferId,
  setOffersSortType,
  setAreOffersLoading,
  setAuthStatus,
  setName,
  setCurrentOffer,
  setIsCurrentOfferLoading
} from './action';

const initialState: InitialStateType = {
  city: { name: '', location: { latitude: 0, longitude: 0, zoom: 0 } },

  offers: [],
  areOffersLoading: true,
  offersSortType: OffersSortType.Popular,

  currentOffer: null,
  isCurrentOfferLoading: true,
  currentOfferId: '',

  authStatus: AuthStatus.Unknown,
  name: ''
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
    .addCase(setOffersSortType, (state, { payload }) => {
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
    .addCase(setAreOffersLoading, (state, { payload }) => {
      state.areOffersLoading = payload;
    })
    .addCase(setAuthStatus, (state, { payload }) => {
      state.authStatus = payload;
    })
    .addCase(setName, (state, { payload }) => {
      state.name = payload;
    })
    .addCase(setIsCurrentOfferLoading, (state, { payload }) => {
      state.isCurrentOfferLoading = payload;
    })
    .addCase(setCurrentOffer, (state, { payload }) => {
      state.currentOffer = payload;
    });
});

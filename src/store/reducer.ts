import { createReducer } from '@reduxjs/toolkit';

import { OfferCity, InitialStateType } from '../shared';
import { offerMocks } from '../mocks';

import { changeCity, setOffers, setCurrentOfferId } from './action';

const stateType: InitialStateType = {
  city: OfferCity.Paris,
  offers: offerMocks,
  currentOfferId: undefined
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
    });
});

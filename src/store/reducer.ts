import { createReducer } from '@reduxjs/toolkit';

import { OfferCity, InitialStateType } from '../shared';
import { offerMocks } from '../mocks';

import { changeCity, setOffers } from './action';

const stateType: InitialStateType = {
  city: OfferCity.Paris,
  offers: offerMocks
};

export const reducer = createReducer(stateType, (builder) => {
  builder
    .addCase(changeCity, (state, { payload }) => {
      state.city = payload;
    })
    .addCase(setOffers, (state) => {
      state.offers = offerMocks;
    });
});

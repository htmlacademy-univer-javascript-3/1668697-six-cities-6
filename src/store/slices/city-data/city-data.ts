import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IOfferCity, NameSpace } from '../../../shared';

import { fetchOffers } from '../../async-action';

import { initialState } from './state';


export const cityData = createSlice({
  name: NameSpace.CityData,
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<IOfferCity>) => {
      state.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.fulfilled, (state, action) => {
        if (action.payload.length > 0) {
          state.city = action.payload[0].city;
        }
      });
  },
});


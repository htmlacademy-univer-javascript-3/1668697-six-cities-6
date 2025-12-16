import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../../shared';

import { fetchOffers } from '../../async-action';

import { initialState } from './state';


export const cityData = createSlice({
  name: NameSpace.CityData,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.fulfilled, (state, action) => {
        if (action.payload.length > 0) {
          state.city = action.payload[0].city;
        }
      });
  },
});


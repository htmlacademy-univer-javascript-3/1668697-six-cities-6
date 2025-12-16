import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IOfferCity } from '../../../shared';
import { NameSpace } from '../../../shared';

import { initialState } from './state';

export const cityData = createSlice({
  name: NameSpace.CityData,
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<IOfferCity>) => {
      state.city = action.payload;
    },
  },
});


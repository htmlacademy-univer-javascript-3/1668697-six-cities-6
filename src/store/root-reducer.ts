import {combineReducers} from '@reduxjs/toolkit';

import { NameSpace } from '../shared';

import { authData, cityData, currentOfferData, offersData } from './slices';

export const rootReducer = combineReducers({
  [NameSpace.AuthData]: authData.reducer,
  [NameSpace.CityData]: cityData.reducer,
  [NameSpace.CurrentOfferData]: currentOfferData.reducer,
  [NameSpace.OffersData]: offersData.reducer,
});

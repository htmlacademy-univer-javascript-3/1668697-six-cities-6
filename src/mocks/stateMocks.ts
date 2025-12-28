import { Action } from 'redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

import { NameSpace, StateType } from '../shared';

import { createAPI } from '../service/api';

import { initialState as authInitialState } from '../store/slices/auth-data/state';
import { initialState as cityInitialState } from '../store/slices/city-data/state';
import { initialState as currentOfferInitialState } from '../store/slices/current-offer-data/state';
import { initialState as errorInitialState } from '../store/slices/error-data/state';
import { initialState as favoritesInitialState } from '../store/slices/favorites-data/state';
import { initialState as offersInitialState } from '../store/slices/offers-data/state';

export type AppThunkDispatch = ThunkDispatch<StateType, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const getMockState = (initialState?: Partial<StateType>): StateType => ({
  [NameSpace.AuthData]: authInitialState,
  [NameSpace.CityData]: cityInitialState,
  [NameSpace.CurrentOfferData]: currentOfferInitialState,
  [NameSpace.ErrorData]: errorInitialState,
  [NameSpace.FavoritesData]: favoritesInitialState,
  [NameSpace.OffersData]: offersInitialState,
  ...initialState ?? {}
});

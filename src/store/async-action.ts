import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiRoutes, AuthStatus } from '../shared';
import { AppDispatchType, StateType, ISimpleOfferInfo, IUser } from '../shared';

import { setOffers, setCity, setIsLoading, setName, setAuthStatus } from './action';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'data/fetchQuestions',
  async (_arg, {dispatch, extra: api}) => {
    const { data } = await api.get<ISimpleOfferInfo[]>(ApiRoutes.Offers);

    const city = data[0].city;

    dispatch(setCity(city));
    dispatch(setOffers(data));
    dispatch(setIsLoading(false));
  },
);

export const checkAuth = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'auth/check',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<IUser>(ApiRoutes.Login);

      dispatch(setName(data.name));
      dispatch(setAuthStatus(AuthStatus.Auth));
    } catch {
      dispatch(setAuthStatus(AuthStatus.NoAuth));
    }
  },
);

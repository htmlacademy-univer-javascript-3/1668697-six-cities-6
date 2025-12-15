import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiRoutes } from '../shared';
import { AppDispatchType, StateType, ISimpleOfferInfo } from '../shared';

import { setOffers, setCity, setIsLoading } from './action';

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

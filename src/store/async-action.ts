import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiRoutes, AppRoute, AuthStatus, AuthData, IOfferReview, IDetailedOfferInfo } from '../shared';
import { AppDispatchType, StateType, ISimpleOfferInfo, IUser } from '../shared';

import { dropToken, saveToken } from '../service/token';

import {
  setOffers,
  setAreOffersLoading,
  setCity,
  setCurrentOffer,
  setIsCurrentOfferLoading,
  setCurrentOfferReviews,
  setCurrentOfferNearbyOffers,
  setName,
  setAuthStatus,
  redirectToRoute,
} from './action';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'offers/fetch',
  async (_arg, {dispatch, extra: api}) => {
    const { data } = await api.get<ISimpleOfferInfo[]>(ApiRoutes.Offers);

    const city = data[0].city;

    dispatch(setCity(city));
    dispatch(setOffers(data));
    dispatch(setAreOffersLoading(false));
  },
);

export const authCheck = createAsyncThunk<void, undefined, {
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

export const authLogin = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'auth/login',
  async (payload, {dispatch, extra: api}) => {
    const { data } = await api.post<IUser>(ApiRoutes.Login, payload);

    saveToken(data.token);

    dispatch(setName(data.name));
    dispatch(setAuthStatus(AuthStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const authLogout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'auth/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRoutes.Logout);

    dropToken();

    dispatch(setName(''));
    dispatch(setAuthStatus(AuthStatus.NoAuth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const fetchReviews = createAsyncThunk<void, { offerId: string }, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'reviews/fetch',
  async ({offerId}, {dispatch, extra: api}) => {
    const { data } = await api.get<IOfferReview[]>(`${ApiRoutes.Reviews}/${offerId}`);

    dispatch(setCurrentOfferReviews(data));
  },
);

export const fetchNearby = createAsyncThunk<void, { offerId: string }, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'nearby/fetch',
  async ({offerId}, {dispatch, extra: api}) => {
    const { data } = await api.get<ISimpleOfferInfo[]>(`${ApiRoutes.Offers}/${offerId}/${ApiRoutes.Nearby}`);

    dispatch(setCurrentOfferNearbyOffers(data));
  },
);

export const fetchCurrentOffer = createAsyncThunk<void, { offerId: string }, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'offer/fetch',
  async ({offerId}, {dispatch, extra: api}) => {
    dispatch(setIsCurrentOfferLoading(true));

    try {
      const { data } = await api.get<IDetailedOfferInfo>(`${ApiRoutes.Offers}/${offerId}`);

      dispatch(fetchReviews({offerId}));
      dispatch(fetchNearby({offerId}));
      dispatch(setCurrentOffer(data));
    } catch {
      dispatch(redirectToRoute(AppRoute.BadRoute));
    }

    dispatch(setIsCurrentOfferLoading(false));
  },
);

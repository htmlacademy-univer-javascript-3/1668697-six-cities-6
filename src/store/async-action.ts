import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiRoutes, AppRoute, AuthData, IOfferReview, IDetailedOfferInfo } from '../shared';
import { AppDispatchType, StateType, ISimpleOfferInfo, IUser, IReview, IFavoriteUpdate } from '../shared';

import { dropToken, saveToken } from '../service/token';

import { redirectToRoute } from './action';

export const fetchOffers = createAsyncThunk<ISimpleOfferInfo[], undefined, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'offers/fetch',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<ISimpleOfferInfo[]>(ApiRoutes.Offers);

    return data;
  },
);

export const fetchReviews = createAsyncThunk<IOfferReview[], { offerId: string }, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'reviews/fetch',
  async ({offerId}, {extra: api}) => {
    const { data } = await api.get<IOfferReview[]>(`${ApiRoutes.Reviews}/${offerId}`);

    return data;
  },
);

export const fetchNearby = createAsyncThunk<ISimpleOfferInfo[], { offerId: string }, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'nearby/fetch',
  async ({offerId}, {extra: api}) => {
    const { data } = await api.get<ISimpleOfferInfo[]>(`${ApiRoutes.Offers}/${offerId}/${ApiRoutes.Nearby}`);

    return data;
  },
);

export const fetchCurrentOffer = createAsyncThunk<IDetailedOfferInfo, { offerId: string }, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'offer/fetch',
  async ({offerId}, {dispatch, extra: api, rejectWithValue}) => {
    try {
      const { data } = await api.get<IDetailedOfferInfo>(`${ApiRoutes.Offers}/${offerId}`);

      dispatch(fetchReviews({offerId}));
      dispatch(fetchNearby({offerId}));

      return data;
    } catch {
      dispatch(redirectToRoute(AppRoute.BadRoute));

      return rejectWithValue(null);
    }
  },
);

export const fetchFavorites = createAsyncThunk<ISimpleOfferInfo[], undefined, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'favorites/fetch',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<ISimpleOfferInfo[]>(ApiRoutes.Favorites);

    return data;
  },
);

export const changeFavoriteStatus = createAsyncThunk<IDetailedOfferInfo, IFavoriteUpdate, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'favorites/changeStatus',
  async ({offerId, status}, {dispatch, extra: api}) => {
    const { data } = await api.post<IDetailedOfferInfo>(`${ApiRoutes.Favorites}/${offerId}/${status}`);

    dispatch(fetchFavorites());

    return data;
  },
);

export const postReview = createAsyncThunk<{ offerId: string }, IReview, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'review/post',
  async ({comment, rating, offerId}, {dispatch, extra: api}) => {
    await api.post(`${ApiRoutes.Reviews}/${offerId}`, {comment, rating});

    dispatch(fetchReviews({offerId}));

    return { offerId };
  },
);

export const authCheck = createAsyncThunk<IUser | null, undefined, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'auth/check',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<IUser>(ApiRoutes.Login);

      dispatch(fetchFavorites());

      return data;
    } catch {
      return null;
    }
  },
);

export const authLogin = createAsyncThunk<IUser, AuthData, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'auth/login',
  async (payload, {dispatch, extra: api}) => {
    const { data } = await api.post<IUser>(ApiRoutes.Login, payload);

    saveToken(data.token);

    dispatch(fetchFavorites());
    dispatch(redirectToRoute(AppRoute.Main));

    return data;
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

    dispatch(redirectToRoute(AppRoute.Main));
  },
);

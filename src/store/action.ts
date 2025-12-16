import { createAction } from '@reduxjs/toolkit';

import { AppRoute } from '../shared';
import {
  ISimpleOfferInfo,
  IDetailedOfferInfo,
  IOfferCity,
  IOfferReview,
  OffersSortType,
  AuthStatus
} from '../shared';

export const setCity = createAction<IOfferCity>('city/set');

export const setOffers = createAction<ISimpleOfferInfo[]>('offers/set');
export const setAreOffersLoading = createAction<boolean>('offers/setLoading');
export const setOffersSortType = createAction<OffersSortType>('offers/setSort');

export const setCurrentOffer = createAction<IDetailedOfferInfo>('offer/set');
export const setIsCurrentOfferLoading = createAction<boolean>('offer/setLoading');
export const setCurrentOfferId = createAction<string>('offer/setId');
export const setCurrentOfferReviews = createAction<IOfferReview[]>('nearby/set');
export const setCurrentOfferNearbyOffers = createAction<ISimpleOfferInfo[]>('reviews/fetch');

export const setAuthStatus = createAction<AuthStatus>('auth/set');
export const setName = createAction<string>('name/set');

export const redirectToRoute = createAction<AppRoute>('route/redirect');

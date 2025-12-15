import { createAction } from '@reduxjs/toolkit';

import { IOfferCity, ISimpleOfferInfo, OffersSortType, AuthStatus } from '../shared';

export const setCity = createAction<IOfferCity>('city/set');

export const setOffers = createAction<ISimpleOfferInfo[]>('offers/set');
export const changeOffersSortType = createAction<OffersSortType>('offers/changeSort');

export const setCurrentOfferId = createAction<string>('offer/setId');

export const setIsLoading = createAction<boolean>('loading/set');
export const setAuthStatus = createAction<AuthStatus>('auth/set');
export const setName = createAction<string>('name/set');

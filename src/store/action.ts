import { createAction } from '@reduxjs/toolkit';

import { IOfferCity, ISimpleOfferInfo, OffersSortType } from '../shared';

export const setCity = createAction<IOfferCity>('city/set');

export const setOffers = createAction<ISimpleOfferInfo[]>('offers/set');
export const changeOffersSortType = createAction<OffersSortType>('offers/changeSort');

export const setCurrentOfferId = createAction<string>('offer/setId');

export const setIsLoading = createAction<boolean>('loading/set');

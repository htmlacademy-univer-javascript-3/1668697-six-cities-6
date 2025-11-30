import { createAction } from '@reduxjs/toolkit';

import { OfferCity, OffersSortType } from '../shared';

export const changeCity = createAction<OfferCity>('city/change');
export const setOffers = createAction('offers/set');
export const changeOffersSortType = createAction<OffersSortType>('offers/changeSort');
export const setCurrentOfferId = createAction<string | undefined>('offer/setId');


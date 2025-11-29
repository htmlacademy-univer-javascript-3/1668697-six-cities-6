import { createAction } from '@reduxjs/toolkit';

import { OfferCity } from '../shared';

export const changeCity = createAction<OfferCity>('city/change');
export const setOffers = createAction('offers/set');


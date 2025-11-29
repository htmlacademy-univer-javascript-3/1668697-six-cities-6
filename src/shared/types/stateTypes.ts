import { IDetailedOffer, OfferCity } from './offerTypes';

import { store } from '../../store';

export interface InitialStateType {
  city: OfferCity;
  offers: IDetailedOffer[];
}

export type StateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;

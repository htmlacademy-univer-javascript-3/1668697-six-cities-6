import { IDetailedOffer, OfferCity, OffersSortType } from './offerTypes';

import { store } from '../../store';

export interface InitialStateType {
  city: OfferCity;
  offers: IDetailedOffer[];
  currentOfferId: string | undefined;
  offersSortType: OffersSortType;
}

export type StateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;

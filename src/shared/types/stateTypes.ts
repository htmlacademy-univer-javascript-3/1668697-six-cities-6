import { IDetailedOffer, OfferCity, SortType } from './offerTypes';

import { store } from '../../store';

export interface InitialStateType {
  city: OfferCity;
  offers: IDetailedOffer[];
  currentOfferId: string | undefined;
  offersSortType: SortType;
}

export type StateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;

import { ISimpleOfferInfo, IOfferCity, OffersSortType } from './offerTypes';

import { store } from '../../store';

export interface InitialStateType {
  city: IOfferCity;
  offers: ISimpleOfferInfo[];
  currentOfferId: string;
  offersSortType: OffersSortType;
  isLoading: boolean;
}

export type StateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;

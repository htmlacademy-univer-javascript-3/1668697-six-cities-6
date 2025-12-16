import {
  ISimpleOfferInfo,
  IDetailedOfferInfo,
  OffersSortType,
  IOfferReview,
  IOfferCity,
} from './offerTypes';
import { AuthStatus } from './authTypes';

import { store } from '../../store';

export interface InitialStateType {
  city: IOfferCity;

  offers: ISimpleOfferInfo[];
  areOffersLoading: boolean;
  offersSortType: OffersSortType;

  currentOffer: IDetailedOfferInfo | null;
  isCurrentOfferLoading: boolean;
  currentOfferId: string;
  currentOfferReviews: IOfferReview[];
  currentOfferNearby: ISimpleOfferInfo[];

  authStatus: AuthStatus;
  name: string;
}

export type StateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;

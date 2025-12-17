import { NameSpace } from '../../../shared';
import { StateType } from '../../../shared';

export const getOffers = (state: StateType) => state[NameSpace.OffersData].offers;
export const getAreOffersLoading = (state: StateType) => state[NameSpace.OffersData].areOffersLoading;
export const getOffersSortType = (state: StateType) => state[NameSpace.OffersData].offersSortType;

import { NameSpace } from '../../../shared';
import { StateType } from '../../../shared';

export const getOffers = (state: Pick<StateType, NameSpace.OffersData>) => state[NameSpace.OffersData].offers;
export const getAreOffersLoading = (state: Pick<StateType, NameSpace.OffersData>) => state[NameSpace.OffersData].areOffersLoading;
export const getOffersSortType = (state: Pick<StateType, NameSpace.OffersData>) => state[NameSpace.OffersData].offersSortType;

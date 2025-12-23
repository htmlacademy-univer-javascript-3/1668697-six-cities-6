import { NameSpace } from '../../../shared';
import { StateType } from '../../../shared';

export const getCurrentOffer = (state: Pick<StateType, NameSpace.CurrentOfferData>) => state[NameSpace.CurrentOfferData].currentOffer;
export const getIsCurrentOfferLoading = (state: Pick<StateType, NameSpace.CurrentOfferData>) => state[NameSpace.CurrentOfferData].isCurrentOfferLoading;
export const getCurrentOfferId = (state: Pick<StateType, NameSpace.CurrentOfferData>) => state[NameSpace.CurrentOfferData].currentOfferId;
export const getCurrentOfferReviews = (state: Pick<StateType, NameSpace.CurrentOfferData>) => state[NameSpace.CurrentOfferData].currentOfferReviews;
export const getCurrentOfferNearby = (state: Pick<StateType, NameSpace.CurrentOfferData>) => state[NameSpace.CurrentOfferData].currentOfferNearby;

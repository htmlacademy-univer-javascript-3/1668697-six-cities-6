import { NameSpace } from '../../../shared';
import { StateType } from '../../../shared';

export const getCurrentOffer = (state: StateType) => state[NameSpace.CurrentOfferData].currentOffer;
export const getIsCurrentOfferLoading = (state: StateType) => state[NameSpace.CurrentOfferData].isCurrentOfferLoading;
export const getCurrentOfferId = (state: StateType) => state[NameSpace.CurrentOfferData].currentOfferId;
export const getCurrentOfferReviews = (state: StateType) => state[NameSpace.CurrentOfferData].currentOfferReviews;
export const getCurrentOfferNearby = (state: StateType) => state[NameSpace.CurrentOfferData].currentOfferNearby;

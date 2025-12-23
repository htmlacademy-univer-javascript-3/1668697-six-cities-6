import { IDetailedOfferInfo, IOfferReview, ISimpleOfferInfo } from '../../../shared/types/offer-types';

interface ICurrentOfferData {
  currentOffer: IDetailedOfferInfo | null;
  isCurrentOfferLoading: boolean;
  currentOfferId: string;
  currentOfferReviews: IOfferReview[];
  currentOfferNearby: ISimpleOfferInfo[];
}

export const initialState: ICurrentOfferData = {
  currentOffer: null,
  isCurrentOfferLoading: false,
  currentOfferId: '',
  currentOfferReviews: [],
  currentOfferNearby: [],
};

import { ISimpleOfferInfo, OffersSortType } from '../../../shared/types/offer-types';

interface IOffersData {
  offers: ISimpleOfferInfo[];
  areOffersLoading: boolean;
  offersSortType: OffersSortType;
}

export const initialState: IOffersData = {
  offers: [],
  areOffersLoading: true,
  offersSortType: OffersSortType.Popular,
};

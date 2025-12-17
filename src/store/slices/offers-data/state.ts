import { ISimpleOfferInfo, OffersSortType } from '../../../shared';

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

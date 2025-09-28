import { IDetailedOffer, OfferCardType } from '../../../shared';

export interface OffersListProps {
  offersData: IDetailedOffer[];
  offerCardType: OfferCardType;
  numberOfOffers?: number;
}

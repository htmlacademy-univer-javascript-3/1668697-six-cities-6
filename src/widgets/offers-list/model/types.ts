import { OfferCardType, ISimpleOfferInfo } from '../../../shared';

export interface OffersListProps {
  offers: ISimpleOfferInfo[];
  offerCardType: OfferCardType;
  numberOfOffers?: number;
}

import { ISimpleOfferInfo, OfferCardType } from '../../../shared';

export interface OfferCardProps {
  id: string;
  offerData: ISimpleOfferInfo;
  offerCardType: OfferCardType;
}

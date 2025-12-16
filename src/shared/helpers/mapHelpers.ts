import { MapIconType, ISimpleOfferInfo } from '../types';

export const getOffersPoints = (
  offersData: ISimpleOfferInfo[],
  activeOfferId: string | undefined
): [number, number, MapIconType][] => offersData.map((offer) => {
  const currentOfferPoint: [number, number] = [offer.location.latitude, offer.location.longitude];
  const currentOfferPointType = offer.id === activeOfferId ? MapIconType.Active : MapIconType.Default;

  return [...currentOfferPoint, currentOfferPointType];
});

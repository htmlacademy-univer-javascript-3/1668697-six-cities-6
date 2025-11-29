import { IDetailedOffer, MapIconType } from '../types';

export const getOffersPoints = (
  offersData: IDetailedOffer[],
  activeOfferId: string | undefined
): [number, number, MapIconType][] => offersData.map((offer) => {
  const currentOfferCoordinates = offer.info.coordinates;
  const currentOfferPointType = offer.id === activeOfferId ? MapIconType.Active : MapIconType.Default;

  return [...currentOfferCoordinates, currentOfferPointType];
});

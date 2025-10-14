import { IDetailedOffer } from '../../../shared';

export const getCurrentData = (id: string, offersData: IDetailedOffer[]) => {
  const newOfferData = offersData.find((offer) => offer.id === id);
  const newNearbyOffersData = offersData.filter((offer) => offer.id !== id);

  return { newOfferData, newNearbyOffersData };
};

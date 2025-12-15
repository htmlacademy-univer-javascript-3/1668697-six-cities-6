import { ISimpleOfferInfo } from '../../../shared';

// TODO: get nearby offers from api data
export const getCurrentData = (id: string, offersData: ISimpleOfferInfo[]) => {
  const newOfferData = offersData.find((offer) => offer.id === id);
  const newNearbyOffersData = offersData.filter((offer) => offer.id !== id);

  return { newOfferData, newNearbyOffersData };
};

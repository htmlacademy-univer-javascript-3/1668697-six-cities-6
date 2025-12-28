import { ISimpleOfferInfo } from '../../../shared';
import { getCitiesData } from '../../../shared';

export const getRandomCity = (offers: ISimpleOfferInfo[]) => {
  const cities = getCitiesData(offers);

  return cities[Math.floor(Math.random() * cities.length)];
};

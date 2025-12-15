import { ISimpleOfferInfo, IOfferCity } from '../../../shared';

export const getCitiesData = (offersData: ISimpleOfferInfo[]) => {
  const citiesNames = new Set();
  const citiesData: IOfferCity[] = [];

  for (const offer of offersData) {
    const currentCity = offer.city;

    if (!citiesNames.has(currentCity.name)) {
      citiesNames.add(currentCity.name);
      citiesData.push(currentCity);
    }
  }

  return citiesData;
};

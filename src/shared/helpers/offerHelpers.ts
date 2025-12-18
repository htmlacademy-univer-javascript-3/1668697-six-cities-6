import { IOfferCity, ISimpleOfferInfo } from '../types';

export const getRatingPercent = (ratingNumber: number) => {
  const roundedRatingNumber = Math.round(ratingNumber);

  const ratingPercentValue = roundedRatingNumber / 5 * 100;

  return `${ratingPercentValue}%`;
};

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

  return citiesData.sort((a, b) => b.name.localeCompare(a.name));
};

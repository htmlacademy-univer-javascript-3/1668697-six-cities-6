import { ISimpleOfferInfo } from '../../../shared';
import { OffersSortType } from '../../../shared';

export const getSortedOffers = (offers: ISimpleOfferInfo[], currentSortType: OffersSortType) => {
  const offersToSort = [...offers];

  switch (currentSortType) {
    case OffersSortType.Popular:
      return offersToSort;
    case OffersSortType.PriceLowToHigh:
      return offersToSort.sort((a, b) => a.price - b.price);
    case OffersSortType.PriceHightToLow:
      return offersToSort.sort((a, b) => b.price - a.price);
    case OffersSortType.TopRated:
      return offersToSort.sort((a, b) => b.rating - a.rating);
    default:
      return offersToSort;
  }
};

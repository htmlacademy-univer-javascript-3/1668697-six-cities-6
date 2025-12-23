import { ISimpleOfferInfo } from '../../../shared/types/offer-types';

interface IFavoritesData {
  favorites: ISimpleOfferInfo[];
  areFavoritesLoading: boolean;
}

export const initialState: IFavoritesData = {
  favorites: [],
  areFavoritesLoading: false,
};

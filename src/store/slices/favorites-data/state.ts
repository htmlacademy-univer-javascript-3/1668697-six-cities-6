import { ISimpleOfferInfo } from '../../../shared';

interface IFavoritesData {
  favorites: ISimpleOfferInfo[];
  areFavoritesLoading: boolean;
}

export const initialState: IFavoritesData = {
  favorites: [],
  areFavoritesLoading: false,
};

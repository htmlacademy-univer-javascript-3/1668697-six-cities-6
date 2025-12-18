import { NameSpace } from '../../../shared';
import { StateType } from '../../../shared';

export const getFavorites = (state: StateType) => state[NameSpace.FavoritesData].favorites;
export const getAreFavoritesLoading = (state: StateType) => state[NameSpace.FavoritesData].areFavoritesLoading;


import { NameSpace } from '../../../shared';
import { StateType } from '../../../shared';

export const getFavorites = (state: Pick<StateType, NameSpace.FavoritesData>) => state[NameSpace.FavoritesData].favorites;
export const getAreFavoritesLoading = (state: Pick<StateType, NameSpace.FavoritesData>) => state[NameSpace.FavoritesData].areFavoritesLoading;

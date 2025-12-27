import { NameSpace } from '../../../shared';
import { getFavorites, getAreFavoritesLoading } from './selectors';
import { getMockSimpleOffer } from '../../../mocks';

describe('FavoritesData selectors', () => {
  const mockFavorite1 = getMockSimpleOffer();
  const mockFavorite2 = getMockSimpleOffer();
  const mockFavorites = [mockFavorite1, mockFavorite2];

  const state = {
    [NameSpace.FavoritesData]: {
      favorites: mockFavorites,
      areFavoritesLoading: false,
    },
  };

  it('should return favorites from state', () => {
    const { favorites } = state[NameSpace.FavoritesData];
    const result = getFavorites(state);
    expect(result).toBe(favorites);
  });

  it('should return areFavoritesLoading from state', () => {
    const { areFavoritesLoading } = state[NameSpace.FavoritesData];
    const result = getAreFavoritesLoading(state);
    expect(result).toBe(areFavoritesLoading);
  });
});


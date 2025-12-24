import { favoritesData } from './favorites-data';
import { fetchFavorites, authLogout } from '../../async-action';

import { getMockSimpleOffer } from '../../../mocks';

describe('FavoritesData slice', () => {
  const initialState = {
    favorites: [],
    areFavoritesLoading: false,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      favorites: [],
      areFavoritesLoading: false,
    };

    const result = favoritesData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      favorites: [],
      areFavoritesLoading: false,
    };

    const result = favoritesData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('"fetchFavorites.pending" should set areFavoritesLoading to true', () => {
    const expectedState = {
      favorites: [],
      areFavoritesLoading: true,
    };

    const result = favoritesData.reducer(initialState, fetchFavorites.pending);

    expect(result).toEqual(expectedState);
  });

  it('"fetchFavorites.fulfilled" should set favorites and areFavoritesLoading to false', () => {
    const mockFavorite1 = getMockSimpleOffer();
    const mockFavorite2 = getMockSimpleOffer();
    const mockFavorites = [mockFavorite1, mockFavorite2];
    const expectedState = {
      favorites: mockFavorites,
      areFavoritesLoading: false,
    };

    const result = favoritesData.reducer(
      initialState,
      fetchFavorites.fulfilled(mockFavorites, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('"fetchFavorites.rejected" should set areFavoritesLoading to false', () => {
    const expectedState = {
      favorites: [],
      areFavoritesLoading: false,
    };

    const result = favoritesData.reducer(initialState, fetchFavorites.rejected);

    expect(result).toEqual(expectedState);
  });

  it('"authLogout.fulfilled" should clear favorites and set areFavoritesLoading to false', () => {
    const mockFavorite1 = getMockSimpleOffer();
    const mockFavorite2 = getMockSimpleOffer();
    const stateWithFavorites = {
      favorites: [mockFavorite1, mockFavorite2],
      areFavoritesLoading: true,
    };
    const expectedState = {
      favorites: [],
      areFavoritesLoading: false,
    };

    const result = favoritesData.reducer(stateWithFavorites, authLogout.fulfilled);

    expect(result).toEqual(expectedState);
  });
});


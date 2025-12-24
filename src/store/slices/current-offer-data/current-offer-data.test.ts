import { currentOfferData } from './current-offer-data';
import { fetchCurrentOffer, fetchReviews, fetchNearby, changeFavoriteStatus, authLogout, fetchFavorites } from '../../async-action';

import { getMockDetailedOffer, getMockReview, getMockSimpleOffer } from '../../../mocks';

describe('CurrentOfferData slice', () => {
  const initialState = {
    currentOffer: null,
    isCurrentOfferLoading: false,
    currentOfferId: '',
    currentOfferReviews: [],
    currentOfferNearby: [],
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      currentOffer: null,
      isCurrentOfferLoading: false,
      currentOfferId: '',
      currentOfferReviews: [],
      currentOfferNearby: [],
    };

    const result = currentOfferData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      currentOffer: null,
      isCurrentOfferLoading: false,
      currentOfferId: '',
      currentOfferReviews: [],
      currentOfferNearby: [],
    };

    const result = currentOfferData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('"setCurrentOfferId" should set currentOfferId', () => {
    const offerId = 'test-id';
    const expectedState = {
      currentOffer: null,
      isCurrentOfferLoading: false,
      currentOfferId: offerId,
      currentOfferReviews: [],
      currentOfferNearby: [],
    };

    const result = currentOfferData.reducer(
      initialState,
      currentOfferData.actions.setCurrentOfferId(offerId)
    );

    expect(result).toEqual(expectedState);
  });

  it('"fetchCurrentOffer.pending" should set isCurrentOfferLoading to true', () => {
    const expectedState = {
      currentOffer: null,
      isCurrentOfferLoading: true,
      currentOfferId: '',
      currentOfferReviews: [],
      currentOfferNearby: [],
    };

    const result = currentOfferData.reducer(initialState, fetchCurrentOffer.pending);

    expect(result).toEqual(expectedState);
  });

  it('"fetchCurrentOffer.fulfilled" should set currentOffer and isCurrentOfferLoading to false', () => {
    const mockOffer = getMockDetailedOffer();
    const expectedState = {
      currentOffer: mockOffer,
      isCurrentOfferLoading: false,
      currentOfferId: '',
      currentOfferReviews: [],
      currentOfferNearby: [],
    };

    const result = currentOfferData.reducer(
      initialState,
      fetchCurrentOffer.fulfilled(mockOffer, '', { offerId: 'test-id' })
    );

    expect(result).toEqual(expectedState);
  });

  it('"fetchCurrentOffer.rejected" should set isCurrentOfferLoading to false', () => {
    const expectedState = {
      currentOffer: null,
      isCurrentOfferLoading: false,
      currentOfferId: '',
      currentOfferReviews: [],
      currentOfferNearby: [],
    };

    const result = currentOfferData.reducer(initialState, fetchCurrentOffer.rejected);

    expect(result).toEqual(expectedState);
  });

  it('"fetchReviews.pending" should set isCurrentOfferLoading to true', () => {
    const expectedState = {
      currentOffer: null,
      isCurrentOfferLoading: true,
      currentOfferId: '',
      currentOfferReviews: [],
      currentOfferNearby: [],
    };

    const result = currentOfferData.reducer(initialState, fetchReviews.pending);

    expect(result).toEqual(expectedState);
  });

  it('"fetchReviews.fulfilled" should set currentOfferReviews and isCurrentOfferLoading to false', () => {
    const mockReview1 = getMockReview();
    const mockReview2 = getMockReview();
    const mockReviews = [mockReview1, mockReview2];
    const expectedState = {
      currentOffer: null,
      isCurrentOfferLoading: false,
      currentOfferId: '',
      currentOfferReviews: mockReviews,
      currentOfferNearby: [],
    };

    const result = currentOfferData.reducer(
      initialState,
      fetchReviews.fulfilled(mockReviews, '', { offerId: 'test-id' })
    );

    expect(result).toEqual(expectedState);
  });

  it('"fetchReviews.rejected" should set isCurrentOfferLoading to false', () => {
    const expectedState = {
      currentOffer: null,
      isCurrentOfferLoading: false,
      currentOfferId: '',
      currentOfferReviews: [],
      currentOfferNearby: [],
    };

    const result = currentOfferData.reducer(initialState, fetchReviews.rejected);

    expect(result).toEqual(expectedState);
  });

  it('"fetchNearby.pending" should set isCurrentOfferLoading to true', () => {
    const expectedState = {
      currentOffer: null,
      isCurrentOfferLoading: true,
      currentOfferId: '',
      currentOfferReviews: [],
      currentOfferNearby: [],
    };

    const result = currentOfferData.reducer(initialState, fetchNearby.pending);

    expect(result).toEqual(expectedState);
  });

  it('"fetchNearby.fulfilled" should set currentOfferNearby and isCurrentOfferLoading to false', () => {
    const mockOffer1 = getMockSimpleOffer();
    const mockOffer2 = getMockSimpleOffer();
    const mockNearby = [mockOffer1, mockOffer2];
    const expectedState = {
      currentOffer: null,
      isCurrentOfferLoading: false,
      currentOfferId: '',
      currentOfferReviews: [],
      currentOfferNearby: mockNearby,
    };

    const result = currentOfferData.reducer(
      initialState,
      fetchNearby.fulfilled(mockNearby, '', { offerId: 'test-id' })
    );

    expect(result).toEqual(expectedState);
  });

  it('"fetchNearby.rejected" should set isCurrentOfferLoading to false', () => {
    const expectedState = {
      currentOffer: null,
      isCurrentOfferLoading: false,
      currentOfferId: '',
      currentOfferReviews: [],
      currentOfferNearby: [],
    };

    const result = currentOfferData.reducer(initialState, fetchNearby.rejected);

    expect(result).toEqual(expectedState);
  });

  it('"changeFavoriteStatus.fulfilled" should update isFavorite for currentOffer when ids match', () => {
    const mockOffer = getMockDetailedOffer();
    const stateWithOffer = {
      ...initialState,
      currentOffer: mockOffer,
    };
    const updatedOffer = { ...mockOffer, isFavorite: !mockOffer.isFavorite };
    const expectedState = {
      ...stateWithOffer,
      currentOffer: updatedOffer,
    };

    const result = currentOfferData.reducer(
      stateWithOffer,
      changeFavoriteStatus.fulfilled(updatedOffer, '', { offerId: mockOffer.id, status: 1 })
    );

    expect(result).toEqual(expectedState);
  });

  it('"changeFavoriteStatus.fulfilled" should update isFavorite for nearby offer when ids match', () => {
    const mockNearbyOffer = getMockSimpleOffer();
    const stateWithNearby = {
      ...initialState,
      currentOfferNearby: [mockNearbyOffer],
    };
    const updatedOffer = getMockDetailedOffer();
    updatedOffer.id = mockNearbyOffer.id;
    updatedOffer.isFavorite = !mockNearbyOffer.isFavorite;
    const expectedState = {
      ...stateWithNearby,
      currentOfferNearby: [{ ...mockNearbyOffer, isFavorite: updatedOffer.isFavorite }],
    };

    const result = currentOfferData.reducer(
      stateWithNearby,
      changeFavoriteStatus.fulfilled(updatedOffer, '', { offerId: mockNearbyOffer.id, status: 1 })
    );

    expect(result).toEqual(expectedState);
  });

  it('"authLogout.fulfilled" should set isFavorite to false for currentOffer and nearby offers', () => {
    const mockOffer = getMockDetailedOffer();
    mockOffer.isFavorite = true;
    const mockNearbyOffer = getMockSimpleOffer();
    mockNearbyOffer.isFavorite = true;
    const stateWithData = {
      ...initialState,
      currentOffer: mockOffer,
      currentOfferNearby: [mockNearbyOffer],
    };
    const expectedState = {
      ...stateWithData,
      currentOffer: { ...mockOffer, isFavorite: false },
      currentOfferNearby: [{ ...mockNearbyOffer, isFavorite: false }],
    };

    const result = currentOfferData.reducer(stateWithData, authLogout.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('"fetchFavorites.fulfilled" should update isFavorite based on favorites list', () => {
    const mockOffer = getMockDetailedOffer();
    const mockNearbyOffer = getMockSimpleOffer();
    const favoriteOffer = getMockSimpleOffer();
    favoriteOffer.id = mockOffer.id;
    favoriteOffer.isFavorite = true;
    const stateWithData = {
      ...initialState,
      currentOffer: mockOffer,
      currentOfferNearby: [mockNearbyOffer],
    };
    const expectedState = {
      ...stateWithData,
      currentOffer: { ...mockOffer, isFavorite: true },
      currentOfferNearby: [{ ...mockNearbyOffer, isFavorite: false }],
    };

    const result = currentOfferData.reducer(
      stateWithData,
      fetchFavorites.fulfilled([favoriteOffer], '', undefined)
    );

    expect(result).toEqual(expectedState);
  });
});


import { offersData } from './offers-data';
import { fetchOffers, changeFavoriteStatus, authLogout, fetchFavorites } from '../../async-action';

import { OffersSortType } from '../../../shared';
import { getMockSimpleOffer, getMockDetailedOffer } from '../../../mocks';

describe('OffersData slice', () => {
  const initialState = {
    offers: [],
    areOffersLoading: true,
    offersSortType: OffersSortType.Popular,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offers: [],
      areOffersLoading: true,
      offersSortType: OffersSortType.Popular,
    };

    const result = offersData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offers: [],
      areOffersLoading: true,
      offersSortType: OffersSortType.Popular,
    };

    const result = offersData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('"setOffersSortType" should set offersSortType', () => {
    const sortType = OffersSortType.PriceHightToLow;
    const expectedState = {
      offers: [],
      areOffersLoading: true,
      offersSortType: sortType,
    };

    const result = offersData.reducer(
      initialState,
      offersData.actions.setOffersSortType(sortType)
    );

    expect(result).toEqual(expectedState);
  });

  it('"fetchOffers.pending" should set areOffersLoading to true', () => {
    const expectedState = {
      offers: [],
      areOffersLoading: true,
      offersSortType: OffersSortType.Popular,
    };

    const result = offersData.reducer(initialState, fetchOffers.pending);

    expect(result).toEqual(expectedState);
  });

  it('"fetchOffers.fulfilled" should set offers and areOffersLoading to false', () => {
    const mockOffer1 = getMockSimpleOffer();
    const mockOffer2 = getMockSimpleOffer();
    const mockOffers = [mockOffer1, mockOffer2];
    const expectedState = {
      offers: mockOffers,
      areOffersLoading: false,
      offersSortType: OffersSortType.Popular,
    };

    const result = offersData.reducer(
      initialState,
      fetchOffers.fulfilled(mockOffers, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('"fetchOffers.rejected" should set areOffersLoading to false', () => {
    const expectedState = {
      offers: [],
      areOffersLoading: false,
      offersSortType: OffersSortType.Popular,
    };

    const result = offersData.reducer(initialState, fetchOffers.rejected);

    expect(result).toEqual(expectedState);
  });

  it('"changeFavoriteStatus.fulfilled" should update isFavorite for offer when id matches', () => {
    const mockOffer1 = getMockSimpleOffer();
    const mockOffer2 = getMockSimpleOffer();
    const stateWithOffers = {
      ...initialState,
      offers: [mockOffer1, mockOffer2],
      areOffersLoading: false,
    };
    const updatedOffer = getMockDetailedOffer();
    updatedOffer.id = mockOffer1.id;
    updatedOffer.isFavorite = !mockOffer1.isFavorite;
    const expectedState = {
      ...stateWithOffers,
      offers: [
        { ...mockOffer1, isFavorite: updatedOffer.isFavorite },
        mockOffer2,
      ],
    };

    const result = offersData.reducer(
      stateWithOffers,
      changeFavoriteStatus.fulfilled(updatedOffer, '', { offerId: mockOffer1.id, status: 1 })
    );

    expect(result).toEqual(expectedState);
  });

  it('"authLogout.fulfilled" should set isFavorite to false for all offers', () => {
    const mockOffer1 = getMockSimpleOffer();
    mockOffer1.isFavorite = true;
    const mockOffer2 = getMockSimpleOffer();
    mockOffer2.isFavorite = true;
    const stateWithOffers = {
      ...initialState,
      offers: [mockOffer1, mockOffer2],
      areOffersLoading: false,
    };
    const expectedState = {
      ...stateWithOffers,
      offers: [
        { ...mockOffer1, isFavorite: false },
        { ...mockOffer2, isFavorite: false },
      ],
    };

    const result = offersData.reducer(stateWithOffers, authLogout.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('"fetchFavorites.fulfilled" should update isFavorite based on favorites list', () => {
    const mockOffer1 = getMockSimpleOffer();
    const mockOffer2 = getMockSimpleOffer();
    const favoriteOffer = getMockSimpleOffer();
    favoriteOffer.id = mockOffer1.id;
    favoriteOffer.isFavorite = true;
    const stateWithOffers = {
      ...initialState,
      offers: [mockOffer1, mockOffer2],
      areOffersLoading: false,
    };
    const expectedState = {
      ...stateWithOffers,
      offers: [
        { ...mockOffer1, isFavorite: true },
        { ...mockOffer2, isFavorite: false },
      ],
    };

    const result = offersData.reducer(
      stateWithOffers,
      fetchFavorites.fulfilled([favoriteOffer], '', undefined)
    );

    expect(result).toEqual(expectedState);
  });
});


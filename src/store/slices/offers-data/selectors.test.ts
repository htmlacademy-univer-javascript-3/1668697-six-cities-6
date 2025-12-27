import { NameSpace, OffersSortType } from '../../../shared';
import { getOffers, getAreOffersLoading, getOffersSortType } from './selectors';
import { getMockSimpleOffer } from '../../../mocks';

describe('OffersData selectors', () => {
  const mockOffer1 = getMockSimpleOffer();
  const mockOffer2 = getMockSimpleOffer();
  const mockOffers = [mockOffer1, mockOffer2];

  const state = {
    [NameSpace.OffersData]: {
      offers: mockOffers,
      areOffersLoading: false,
      offersSortType: OffersSortType.Popular,
    },
  };

  it('should return offers from state', () => {
    const { offers } = state[NameSpace.OffersData];
    const result = getOffers(state);
    expect(result).toBe(offers);
  });

  it('should return areOffersLoading from state', () => {
    const { areOffersLoading } = state[NameSpace.OffersData];
    const result = getAreOffersLoading(state);
    expect(result).toBe(areOffersLoading);
  });

  it('should return offersSortType from state', () => {
    const { offersSortType } = state[NameSpace.OffersData];
    const result = getOffersSortType(state);
    expect(result).toBe(offersSortType);
  });
});


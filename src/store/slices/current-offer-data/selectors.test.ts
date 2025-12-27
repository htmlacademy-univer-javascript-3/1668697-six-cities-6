import { NameSpace } from '../../../shared';
import {
  getCurrentOffer,
  getIsCurrentOfferLoading,
  getCurrentOfferId,
  getCurrentOfferReviews,
  getCurrentOfferNearby,
} from './selectors';
import { getMockDetailedOffer, getMockReview, getMockSimpleOffer } from '../../../mocks';

describe('CurrentOfferData selectors', () => {
  const mockDetailedOffer = getMockDetailedOffer();
  const mockReview = getMockReview();
  const mockSimpleOffer = getMockSimpleOffer();

  const state = {
    [NameSpace.CurrentOfferData]: {
      currentOffer: mockDetailedOffer,
      isCurrentOfferLoading: false,
      currentOfferId: mockDetailedOffer.id,
      currentOfferReviews: [mockReview],
      currentOfferNearby: [mockSimpleOffer],
    },
  };

  it('should return currentOffer from state', () => {
    const { currentOffer } = state[NameSpace.CurrentOfferData];
    const result = getCurrentOffer(state);
    expect(result).toBe(currentOffer);
  });

  it('should return isCurrentOfferLoading from state', () => {
    const { isCurrentOfferLoading } = state[NameSpace.CurrentOfferData];
    const result = getIsCurrentOfferLoading(state);
    expect(result).toBe(isCurrentOfferLoading);
  });

  it('should return currentOfferId from state', () => {
    const { currentOfferId } = state[NameSpace.CurrentOfferData];
    const result = getCurrentOfferId(state);
    expect(result).toBe(currentOfferId);
  });

  it('should return currentOfferReviews from state', () => {
    const { currentOfferReviews } = state[NameSpace.CurrentOfferData];
    const result = getCurrentOfferReviews(state);
    expect(result).toBe(currentOfferReviews);
  });

  it('should return currentOfferNearby from state', () => {
    const { currentOfferNearby } = state[NameSpace.CurrentOfferData];
    const result = getCurrentOfferNearby(state);
    expect(result).toBe(currentOfferNearby);
  });
});


import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import { withStore, withHistory, getMockState, getMockDetailedOffer, getMockSimpleOffer, getMockReview } from '../../../mocks';
import { AuthStatus, NameSpace } from '../../../shared';

import { OfferPage } from './offer-page';

vi.mock('../../../shared/hooks/use-map', () => ({
  useMap: () => null,
}));

describe('Component: OfferPage', () => {
  const mockHistory = createMemoryHistory();
  const mockOffer = getMockDetailedOffer();
  const mockNearbyOffer = getMockSimpleOffer();

  it('should render correctly with offer data', () => {
    const { withStoreComponent } = withStore(
      <OfferPage />,
      getMockState({
        [NameSpace.CurrentOfferData]: {
          currentOffer: mockOffer,
          isCurrentOfferLoading: false,
          currentOfferId: mockOffer.id,
          currentOfferReviews: [],
          currentOfferNearby: [mockNearbyOffer],
        },
      })
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);
    mockHistory.push(`/offer/${mockOffer.id}`);

    render(preparedComponent);

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Other places in the neighbourhood/ })).toBeInTheDocument();
    expect(screen.getByTestId('gallery')).toBeInTheDocument();
  });

  it('should render Spinner when offer is loading', () => {
    const { withStoreComponent } = withStore(
      <OfferPage />,
      getMockState({
        [NameSpace.CurrentOfferData]: {
          currentOffer: null,
          isCurrentOfferLoading: true,
          currentOfferId: '',
          currentOfferReviews: [],
          currentOfferNearby: [],
        },
      })
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);
    mockHistory.push(`/offer/${mockOffer.id}`);

    render(preparedComponent);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should render OfferReviewForm when user is authenticated', () => {
    const { withStoreComponent } = withStore(
      <OfferPage />,
      getMockState({
        [NameSpace.AuthData]: {
          authStatus: AuthStatus.Auth,
          email: 'test@test.ru',
        },
        [NameSpace.CurrentOfferData]: {
          currentOffer: mockOffer,
          isCurrentOfferLoading: false,
          currentOfferId: mockOffer.id,
          currentOfferReviews: [],
          currentOfferNearby: [],
        },
      })
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);
    mockHistory.push(`/offer/${mockOffer.id}`);

    render(preparedComponent);

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved')).toBeInTheDocument();
  });

  it('should not render OfferReviewForm when user is not authenticated', () => {
    const { withStoreComponent } = withStore(
      <OfferPage />,
      getMockState({
        [NameSpace.AuthData]: {
          authStatus: AuthStatus.NoAuth,
          email: '',
        },
        [NameSpace.CurrentOfferData]: {
          currentOffer: mockOffer,
          isCurrentOfferLoading: false,
          currentOfferId: mockOffer.id,
          currentOfferReviews: [],
          currentOfferNearby: [],
        },
      })
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);
    mockHistory.push(`/offer/${mockOffer.id}`);

    render(preparedComponent);

    expect(screen.queryByText('Your review')).not.toBeInTheDocument();
  });

  it('should display correct number of reviews', () => {
    const mockReviews = [getMockReview(), getMockReview()];

    const { withStoreComponent } = withStore(
      <OfferPage />,
      getMockState({
        [NameSpace.CurrentOfferData]: {
          currentOffer: mockOffer,
          isCurrentOfferLoading: false,
          currentOfferId: mockOffer.id,
          currentOfferReviews: mockReviews,
          currentOfferNearby: [],
        },
      })
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);
    mockHistory.push(`/offer/${mockOffer.id}`);

    render(preparedComponent);

    expect(screen.getByTestId('reviews-amount')).toHaveTextContent('2');
  });
});


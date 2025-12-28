import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';

import { withHistory, withStore, getMockState } from '../mocks';
import { getMockSimpleOffer, getMockDetailedOffer } from '../mocks';
import { AppRoute, AuthStatus, NameSpace, OffersSortType } from '../shared';

import App from './app';

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  const offerMockData = getMockSimpleOffer();
  const currentOfferMockData = getMockDetailedOffer();

  const offersMockStore = {
    offers: [offerMockData],
    areOffersLoading: false,
    offersSortType: OffersSortType.Popular
  };
  const currentOfferMockStore = {
    currentOffer: currentOfferMockData,
    isCurrentOfferLoading: false,
    currentOfferId: currentOfferMockData.id,
    currentOfferReviews: [],
    currentOfferNearby: []
  };
  const favoritesMockStore = {
    favorites: [offerMockData],
    areFavoritesLoading: false
  };
  const authMockStore = { authStatus: AuthStatus.Auth, email: 'test@test.ru' };

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainPage" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      getMockState({ [NameSpace.OffersData]: offersMockStore })
    );
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByRole('heading', { hidden: true, name: 'Cities' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { hidden: true, name: 'Places' })).toBeInTheDocument();
    expect(screen.getByText(/places to stay in/)).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      getMockState({ [NameSpace.OffersData]: offersMockStore })
    );
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('should render "OfferPage" when user navigate to "/offer"', () => {
    const mockOffer = getMockDetailedOffer();
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      getMockState({
        [NameSpace.OffersData]: offersMockStore,
        [NameSpace.CurrentOfferData]: currentOfferMockStore
      })
    );
    mockHistory.push(`/offer/${mockOffer.id}`);

    render(withStoreComponent);

    expect(screen.getByRole('heading', { name: /Other places in the neighbourhood/ })).toBeInTheDocument();
  });

  it('should render "FavoritesPage" when user navigate to "/favorites"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      getMockState({
        [NameSpace.AuthData]: authMockStore,
        [NameSpace.OffersData]: offersMockStore,
        [NameSpace.FavoritesData]: favoritesMockStore
      })
    );
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByRole('heading', { name: 'Saved listing' })).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      getMockState({ [NameSpace.OffersData]: offersMockStore })
    );
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
    expect(screen.getByText('Nothing here yet...')).toBeInTheDocument();
  });
});

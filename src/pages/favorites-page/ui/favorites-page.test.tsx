import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import { withStore, withHistory, getMockState, getMockSimpleOffer, getMockCity } from '../../../mocks';
import { AppRoute, AuthStatus, NameSpace } from '../../../shared';
import { setCity } from '../../../store/slices';

import { FavoritesPage } from './favorites-page';

describe('Component: FavoritesPage', () => {
  const mockHistory = createMemoryHistory();

  it('should render correctly with favorites', () => {
    const mockCity1 = getMockCity();
    const mockCity2 = getMockCity();
    const mockOffer1 = getMockSimpleOffer();
    mockOffer1.city = mockCity1;
    const mockOffer2 = getMockSimpleOffer();
    mockOffer2.city = mockCity2;

    const { withStoreComponent } = withStore(
      <FavoritesPage />,
      getMockState({
        [NameSpace.AuthData]: {
          authStatus: AuthStatus.Auth,
          email: 'test@test.ru',
        },
        [NameSpace.FavoritesData]: {
          favorites: [mockOffer1, mockOffer2],
          areFavoritesLoading: false,
        },
      })
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByRole('heading', { name: 'Saved listing' })).toBeInTheDocument();
    expect(screen.getByText(mockCity1.name)).toBeInTheDocument();
    expect(screen.getByText(mockCity2.name)).toBeInTheDocument();
  });

  it('should render Spinner when favorites are loading', () => {
    const { withStoreComponent } = withStore(
      <FavoritesPage />,
      getMockState({
        [NameSpace.AuthData]: {
          authStatus: AuthStatus.Auth,
          email: 'test@test.ru',
        },
        [NameSpace.FavoritesData]: {
          favorites: [],
          areFavoritesLoading: true,
        },
      })
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should render FavoritesEmptyPage when favorites list is empty', () => {
    const { withStoreComponent } = withStore(
      <FavoritesPage />,
      getMockState({
        [NameSpace.AuthData]: {
          authStatus: AuthStatus.Auth,
          email: 'test@test.ru',
        },
        [NameSpace.FavoritesData]: {
          favorites: [],
          areFavoritesLoading: false,
        },
      })
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
  });

  it('should dispatch setCity and navigate to main when city link is clicked', async () => {
    const mockCity = getMockCity();
    const mockOffer = getMockSimpleOffer();
    mockOffer.city = mockCity;

    const { withStoreComponent, mockStore } = withStore(
      <FavoritesPage />,
      getMockState({
        [NameSpace.AuthData]: {
          authStatus: AuthStatus.Auth,
          email: 'test@test.ru',
        },
        [NameSpace.FavoritesData]: {
          favorites: [mockOffer],
          areFavoritesLoading: false,
        },
      })
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    mockHistory.push(AppRoute.Favorites);
    render(preparedComponent);

    const cityLink = screen.getByText(mockCity.name);
    await userEvent.click(cityLink);

    const actions = mockStore.getActions();
    expect(actions[0].type).toBe(setCity.type);
    expect(actions[0].payload).toEqual(mockCity);
    expect(mockHistory.location.pathname).toBe(AppRoute.Main);
  });

  it('should navigate to main page when footer logo is clicked', async () => {
    const mockCity = getMockCity();
    const mockOffer = getMockSimpleOffer();
    mockOffer.city = mockCity;

    const { withStoreComponent } = withStore(
      <FavoritesPage />,
      getMockState({
        [NameSpace.AuthData]: {
          authStatus: AuthStatus.Auth,
          email: 'test@test.ru',
        },
        [NameSpace.FavoritesData]: {
          favorites: [mockOffer],
          areFavoritesLoading: false,
        },
      })
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    mockHistory.push(AppRoute.Favorites);
    render(preparedComponent);

    const footerLink = screen.getByTestId('footer-logo-link');
    await userEvent.click(footerLink);

    expect(mockHistory.location.pathname).toBe(AppRoute.Main);
  });
});


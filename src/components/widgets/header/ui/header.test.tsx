import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import { withStore, withHistory, getMockState, getMockSimpleOffer, extractActionsTypes } from '../../../../mocks';
import { AuthStatus, AppRoute, NameSpace, ApiRoute } from '../../../../shared';

import { authLogout } from '../../../../store/async-action';
import { redirectToRoute } from '../../../../store/action';

import { Header } from './header';

describe('Component: Header', () => {
  const mockHistory = createMemoryHistory();

  beforeEach(() => {
    mockHistory.push(AppRoute.NotFound);
  });

  it('should render correctly when user is authenticated', () => {
    const mockOffer1 = getMockSimpleOffer();
    const mockOffer2 = getMockSimpleOffer();
    const { withStoreComponent } = withStore(
      <Header />,
      getMockState({
        [NameSpace.AuthData]: {
          authStatus: AuthStatus.Auth,
          email: 'test@example.com',
        },
        [NameSpace.FavoritesData]: {
          favorites: [mockOffer1, mockOffer2],
          areFavoritesLoading: false,
        },
      })
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should render correctly when user not authenticated', () => {
    const { withStoreComponent } = withStore(
      <Header />,
      getMockState({
        [NameSpace.AuthData]: {
          authStatus: AuthStatus.NoAuth,
          email: '',
        },
      })
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
  });

  it('should navigate to main page when user clicks logo', async () => {
    const { withStoreComponent } = withStore(
      <Header />,
      getMockState()
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);
    await userEvent.click(screen.getByAltText('6 cities logo'));

    expect(mockHistory.location.pathname).toBe(AppRoute.Main);
  });

  it('should dispatch authLogout when user clicks Sign out', async () => {
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      <Header />,
      getMockState({
        [NameSpace.AuthData]: {
          authStatus: AuthStatus.Auth,
          email: 'test@example.com',
        },
      })
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(204);

    render(preparedComponent);
    await userEvent.click(screen.getByText('Sign out'));

    await waitFor(() => {
      const actions = mockStore.getActions();
      const actionTypes = extractActionsTypes(actions);
      expect(actionTypes).toContain(authLogout.fulfilled.type);
    });

    const emittedActions = mockStore.getActions();
    const extractedActionsTypes = extractActionsTypes(emittedActions);

    expect(extractedActionsTypes).toEqual([
      authLogout.pending.type,
      redirectToRoute.type,
      authLogout.fulfilled.type,
    ]);
  });

  it('should navigate to login when user clicks Sign in', async () => {
    const { withStoreComponent } = withStore(
      <Header />,
      getMockState({
        [NameSpace.AuthData]: {
          authStatus: AuthStatus.NoAuth,
          email: '',
        },
      })
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);
    await userEvent.click(screen.getByText('Sign in'));

    expect(mockHistory.location.pathname).toBe(AppRoute.Login);
  });

  it('should navigate to favorites when user clicks on profile link', async () => {
    const { withStoreComponent } = withStore(
      <Header />,
      getMockState({
        [NameSpace.AuthData]: {
          authStatus: AuthStatus.Auth,
          email: 'test@example.com',
        },
      })
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);
    await userEvent.click(screen.getByText('test@example.com'));

    expect(mockHistory.location.pathname).toBe(AppRoute.Favorites);
  });
});

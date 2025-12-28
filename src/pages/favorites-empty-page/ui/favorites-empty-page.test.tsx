import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import { withStore, withHistory, getMockState } from '../../../mocks';
import { AppRoute, AuthStatus, NameSpace } from '../../../shared';

import { FavoritesEmptyPage } from './favorites-empty-page';

describe('Component: FavoritesEmptyPage', () => {
  const mockHistory = createMemoryHistory();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <FavoritesEmptyPage />,
      getMockState({
        [NameSpace.AuthData]: {
          authStatus: AuthStatus.Auth,
          email: 'test@test.ru',
        },
      })
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(screen.getByText('Save properties to narrow down search or plan your future trips.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { hidden: true, name: 'Favorites (empty)' })).toBeInTheDocument();
  });

  it('should navigate to main page when footer logo is clicked', async () => {
    const expectedTestid = 'footer-logo-link';
    const { withStoreComponent } = withStore(
      <FavoritesEmptyPage />,
      getMockState({
        [NameSpace.AuthData]: {
          authStatus: AuthStatus.Auth,
          email: 'test@test.ru',
        },
      })
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    mockHistory.push(AppRoute.Favorites);
    render(preparedComponent);

    const footerLink = screen.getByTestId(expectedTestid);
    await userEvent.click(footerLink);

    expect(mockHistory.location.pathname).toBe(AppRoute.Main);
  });
});


import { MemoryHistory, createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { AppRoute, AuthStatus, NameSpace } from '../../../../shared';
import { withHistory, withStore } from '../../../../mocks';

import { PrivateRoute } from './private-route';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.Favorites);
  });

  it('should render component for public route, when user is not authorized', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';
    const { withStoreComponent } = withStore(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{expectedText}</span>} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute>
            <span>{notExpectedText}</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      { [NameSpace.AuthData]: { authStatus: AuthStatus.NoAuth, email: '' }}
    );
    const preparedComponent = withHistory(
      withStoreComponent,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user is authorized', () => {
    const expectedText = 'private route';
    const notExpectedText = 'public route';
    const { withStoreComponent } = withStore(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{notExpectedText}</span>} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute>
            <span>{expectedText}</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      { [NameSpace.AuthData]: { authStatus: AuthStatus.Auth, email: 'test@test.ru' }}
    );
    const preparedComponent = withHistory(
      withStoreComponent,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});

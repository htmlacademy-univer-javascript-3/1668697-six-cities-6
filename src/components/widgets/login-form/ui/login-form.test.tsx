import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import { withStore, withHistory, getMockState, extractActionsTypes, getMockUser } from '../../../../mocks';
import { ApiRoute } from '../../../../shared';

import { authLogin, fetchFavorites } from '../../../../store/async-action';
import { redirectToRoute } from '../../../../store/action';

import { LoginForm } from './login-form';

describe('Component: LoginForm', () => {
  const mockHistory = createMemoryHistory();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <LoginForm />,
      getMockState()
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('should update email input value correctly', async () => {
    const expectedValue = 'test@example.com';
    const { withStoreComponent } = withStore(
      <LoginForm />,
      getMockState()
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);
    await userEvent.type(screen.getByTestId('email-input'), expectedValue);

    expect(screen.getByDisplayValue(expectedValue)).toBeInTheDocument();
  });

  it('should update password input value correctly', async () => {
    const expectedValue = '123456';
    const { withStoreComponent } = withStore(
      <LoginForm />,
      getMockState()
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);
    await userEvent.type(screen.getByTestId('password-input'), expectedValue);

    expect(screen.getByDisplayValue(expectedValue)).toBeInTheDocument();
  });

  it('should dispatch authLogin with correct email and password when form is submitted', async () => {
    const fakeAuthData = { email: 'test@example.com', password: '123456' };
    const mockUser = getMockUser();
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      <LoginForm />,
      getMockState()
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    mockAxiosAdapter.onPost(ApiRoute.Login, fakeAuthData).reply(200, mockUser);
    mockAxiosAdapter.onGet(ApiRoute.Favorites).reply(200, []);

    render(preparedComponent);
    await userEvent.type(screen.getByTestId('email-input'), fakeAuthData.email);
    await userEvent.type(screen.getByTestId('password-input'), fakeAuthData.password);
    await userEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    await waitFor(() => {
      const actions = mockStore.getActions();
      const actionTypes = extractActionsTypes(actions);
      expect(actionTypes).toContain(authLogin.fulfilled.type);
    });

    const emittedActions = mockStore.getActions();
    const extractedActionsTypes = extractActionsTypes(emittedActions);

    expect(extractedActionsTypes[0]).toBe(authLogin.pending.type);
    expect(extractedActionsTypes).toContain(fetchFavorites.pending.type);
    expect(extractedActionsTypes).toContain(redirectToRoute.type);
    expect(extractedActionsTypes).toContain(authLogin.fulfilled.type);
  });

  it('should not dispatch authLogin when form is submitted empty', async () => {
    const { withStoreComponent, mockStore } = withStore(
      <LoginForm />,
      getMockState()
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);
    await userEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(mockStore.getActions()).toEqual([]);
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import { withStore, withHistory, getMockState, getMockSimpleOffer, getMockCity } from '../../../mocks';
import { AppRoute, AuthStatus, NameSpace, OffersSortType } from '../../../shared';
import { redirectToRoute } from '../../../store/action';
import { setCity } from '../../../store/slices';

import { LoginPage } from './login-page';

describe('Component: LoginPage', () => {
  const mockHistory = createMemoryHistory();

  it('should render correctly', () => {
    const mockCity = getMockCity();
    const mockOffer = getMockSimpleOffer();
    mockOffer.city = mockCity;

    const { withStoreComponent } = withStore(
      <LoginPage />,
      getMockState({
        [NameSpace.AuthData]: {
          authStatus: AuthStatus.NoAuth,
          email: '',
        },
        [NameSpace.OffersData]: {
          offers: [mockOffer],
          areOffersLoading: false,
          offersSortType: OffersSortType.Popular,
        },
      })
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByText(mockCity.name)).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
  });

  it('should redirect to main page when user is already authenticated', () => {
    const mockCity = getMockCity();
    const mockOffer = getMockSimpleOffer();
    mockOffer.city = mockCity;

    const { withStoreComponent, mockStore } = withStore(
      <LoginPage />,
      getMockState({
        [NameSpace.AuthData]: {
          authStatus: AuthStatus.Auth,
          email: 'test@test.ru',
        },
        [NameSpace.OffersData]: {
          offers: [mockOffer],
          areOffersLoading: false,
          offersSortType: OffersSortType.Popular,
        },
      })
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    const actions = mockStore.getActions();
    expect(actions).toEqual([
      { type: redirectToRoute.type, payload: AppRoute.Main },
    ]);
  });

  it('should dispatch setCity and navigate to main when city link is clicked', async () => {
    const mockCity = getMockCity();
    const mockOffer = getMockSimpleOffer();
    mockOffer.city = mockCity;

    const { withStoreComponent, mockStore } = withStore(
      <LoginPage />,
      getMockState({
        [NameSpace.AuthData]: {
          authStatus: AuthStatus.NoAuth,
          email: '',
        },
        [NameSpace.OffersData]: {
          offers: [mockOffer],
          areOffersLoading: false,
          offersSortType: OffersSortType.Popular,
        },
      })
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    mockHistory.push(AppRoute.Login);
    render(preparedComponent);

    const cityLink = screen.getByText(mockCity.name);
    await userEvent.click(cityLink);

    const actions = mockStore.getActions();
    expect(actions[0].type).toBe(setCity.type);
    expect(actions[0].payload).toEqual(mockCity);
    expect(mockHistory.location.pathname).toBe(AppRoute.Main);
  });
});


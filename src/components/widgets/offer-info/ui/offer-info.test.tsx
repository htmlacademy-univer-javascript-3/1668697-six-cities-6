import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import { withStore, withHistory, getMockState, getMockDetailedOffer, extractActionsTypes } from '../../../../mocks';
import { AuthStatus, NameSpace, ApiRoute, AppRoute } from '../../../../shared';

import { changeFavoriteStatus, fetchFavorites } from '../../../../store/async-action';
import { redirectToRoute } from '../../../../store/action';

import { OfferInfo } from './offer-info';

const mockOfferData = getMockDetailedOffer();

describe('Component: OfferInfo', () => {
  const mockHistory = createMemoryHistory();

  it('should render correctly with all data', () => {
    const { withStoreComponent } = withStore(
      <OfferInfo offerData={mockOfferData} />,
      getMockState()
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByText(mockOfferData.title)).toBeInTheDocument();
    const uniqueGoods = Array.from(new Set(mockOfferData.goods));
    uniqueGoods.forEach((good) => {
      expect(screen.getAllByText(good).length).toBeGreaterThan(0);
    });
  });

  it('should render premium label when isPremium is true', () => {
    const offerData = { ...mockOfferData, isPremium: true };
    const { withStoreComponent } = withStore(
      <OfferInfo offerData={offerData} />,
      getMockState()
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should not render premium label when isPremium is false', () => {
    const offerData = { ...mockOfferData, isPremium: false };
    const { withStoreComponent } = withStore(
      <OfferInfo offerData={offerData} />,
      getMockState()
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should toggle bookmark button class on click', async () => {
    const offerData = { ...mockOfferData, isFavorite: false };
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      <OfferInfo offerData={offerData} />,
      getMockState({
        [NameSpace.AuthData]: {
          authStatus: AuthStatus.Auth,
          email: 'test@test.ru',
        },
      })
    );

    mockAxiosAdapter.onPost(`${ApiRoute.Favorites}/${offerData.id}/1`).reply(201, { ...offerData, isFavorite: true });
    mockAxiosAdapter.onGet(ApiRoute.Favorites).reply(200, []);

    const preparedComponent = withHistory(withStoreComponent, mockHistory);
    const { rerender } = render(preparedComponent);

    const bookmarkButton = screen.getByRole('button');
    expect(bookmarkButton).not.toHaveClass('offer__bookmark-button--active');

    await userEvent.click(bookmarkButton);

    await waitFor(() => {
      const actions = mockStore.getActions();
      const actionTypes = extractActionsTypes(actions);
      expect(actionTypes).toContain(changeFavoriteStatus.fulfilled.type);
    });

    const updatedOfferData = { ...offerData, isFavorite: true };
    const { withStoreComponent: updatedWithStoreComponent } = withStore(
      <OfferInfo offerData={updatedOfferData} />,
      getMockState({
        [NameSpace.AuthData]: {
          authStatus: AuthStatus.Auth,
          email: 'test@test.ru',
        },
      })
    );
    const updatedPreparedComponent = withHistory(updatedWithStoreComponent, mockHistory);
    rerender(updatedPreparedComponent);

    const updatedBookmarkButton = screen.getByRole('button');
    expect(updatedBookmarkButton).toHaveClass('offer__bookmark-button--active');
  });

  it('should display singular "Bedroom" when bedrooms = 1', () => {
    const offerData = { ...mockOfferData, bedrooms: 1 };
    const { withStoreComponent } = withStore(
      <OfferInfo offerData={offerData} />,
      getMockState()
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByText('1 Bedroom')).toBeInTheDocument();
  });

  it('should display plural "Bedrooms" when bedrooms > 1', () => {
    const offerData = { ...mockOfferData, bedrooms: 2 };
    const { withStoreComponent } = withStore(
      <OfferInfo offerData={offerData} />,
      getMockState()
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByText('2 Bedrooms')).toBeInTheDocument();
  });

  it('should display singular "adult" when maxAdults = 1', () => {
    const offerData = { ...mockOfferData, maxAdults: 1 };
    const { withStoreComponent } = withStore(
      <OfferInfo offerData={offerData} />,
      getMockState()
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByText('Max 1 adult')).toBeInTheDocument();
  });

  it('should display plural "adults" when maxAdults > 1', () => {
    const offerData = { ...mockOfferData, maxAdults: 3 };
    const { withStoreComponent } = withStore(
      <OfferInfo offerData={offerData} />,
      getMockState()
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByText('Max 3 adults')).toBeInTheDocument();
  });

  it('should redirect to login when user is not authenticated and clicks bookmark', async () => {
    const { withStoreComponent, mockStore } = withStore(
      <OfferInfo offerData={mockOfferData} />,
      getMockState({
        [NameSpace.AuthData]: {
          authStatus: AuthStatus.NoAuth,
          email: '',
        },
      })
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);
    await userEvent.click(screen.getByRole('button'));
    const actions = mockStore.getActions();

    expect(actions).toEqual([
      { type: redirectToRoute.type, payload: AppRoute.Login },
    ]);
  });

  it('should dispatch changeFavoriteStatus when user is authenticated and clicks bookmark', async () => {
    const offerData = { ...mockOfferData, isFavorite: false };
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      <OfferInfo offerData={offerData} />,
      getMockState({
        [NameSpace.AuthData]: {
          authStatus: AuthStatus.Auth,
          email: 'test@test.ru',
        },
      })
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    mockAxiosAdapter.onPost(`${ApiRoute.Favorites}/${offerData.id}/1`).reply(201, offerData);
    mockAxiosAdapter.onGet(ApiRoute.Favorites).reply(200, []);

    render(preparedComponent);
    await userEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      const actions = mockStore.getActions();
      const actionTypes = extractActionsTypes(actions);
      expect(actionTypes).toContain(changeFavoriteStatus.fulfilled.type);
    });

    const emittedActions = mockStore.getActions();
    const extractedActionsTypes = extractActionsTypes(emittedActions);

    expect(extractedActionsTypes[0]).toBe(changeFavoriteStatus.pending.type);
    expect(extractedActionsTypes).toContain(fetchFavorites.pending.type);
    expect(extractedActionsTypes).toContain(changeFavoriteStatus.fulfilled.type);
  });
});

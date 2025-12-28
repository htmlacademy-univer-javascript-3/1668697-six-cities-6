import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import { withStore, withHistory, getMockState, getMockSimpleOffer, extractActionsTypes } from '../../../../mocks';
import { AuthStatus, AppRoute, NameSpace, ApiRoute, OfferCardType } from '../../../../shared';
import { changeFavoriteStatus, fetchFavorites } from '../../../../store/async-action';
import { redirectToRoute } from '../../../../store/action';

import { OfferCard } from './offer-card';

describe('Component: OfferCard', () => {
  const mockHistory = createMemoryHistory();
  const mockOfferData = getMockSimpleOffer();
  const mockOnActiveCardIdChange = vi.fn();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <OfferCard
        id={mockOfferData.id}
        offerData={mockOfferData}
        offerCardType={OfferCardType.Main}
        onActiveCardIdChange={mockOnActiveCardIdChange}
      />,
      getMockState()
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByTestId('offer-card')).toBeInTheDocument();
    expect(screen.getByText(mockOfferData.title)).toBeInTheDocument();
    expect(screen.getByText(`€${mockOfferData.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockOfferData.type)).toBeInTheDocument();
  });

  it('should render premium label when isPremium is true', () => {
    const premiumOfferData = { ...mockOfferData, isPremium: true };
    const { withStoreComponent } = withStore(
      <OfferCard
        id={premiumOfferData.id}
        offerData={premiumOfferData}
        offerCardType={OfferCardType.Main}
        onActiveCardIdChange={mockOnActiveCardIdChange}
      />,
      getMockState()
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should call onActiveCardIdChange on mouse over and leave', async () => {
    const { withStoreComponent } = withStore(
      <OfferCard
        id={mockOfferData.id}
        offerData={mockOfferData}
        offerCardType={OfferCardType.Main}
        onActiveCardIdChange={mockOnActiveCardIdChange}
      />,
      getMockState()
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    const card = screen.getByTestId('offer-card');
    await userEvent.hover(card);
    expect(mockOnActiveCardIdChange).toHaveBeenCalledWith(mockOfferData.id);

    await userEvent.unhover(card);
    expect(mockOnActiveCardIdChange).toHaveBeenCalledWith('');
  });

  it('should redirect to login when user is not authenticated and clicks bookmark', async () => {
    const { withStoreComponent, mockStore } = withStore(
      <OfferCard
        id={mockOfferData.id}
        offerData={mockOfferData}
        offerCardType={OfferCardType.Main}
        onActiveCardIdChange={mockOnActiveCardIdChange}
      />,
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
      <OfferCard
        id={offerData.id}
        offerData={offerData}
        offerCardType={OfferCardType.Main}
        onActiveCardIdChange={mockOnActiveCardIdChange}
      />,
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

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { withStore, getMockState } from '../../../../mocks';
import { OffersSortType, NameSpace } from '../../../../shared';

import { offersData } from '../../../../store/slices';

import { OffersSort } from './offers-sort';

describe('Component: OffersSort', () => {
  const mockOffersSortType = OffersSortType.Popular;

  it('should render correctly with current sort type', () => {
    const { withStoreComponent } = withStore(
      <OffersSort />,
      getMockState({
        [NameSpace.OffersData]: {
          offers: [],
          areOffersLoading: false,
          offersSortType: mockOffersSortType,
        },
      })
    );

    render(withStoreComponent);

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByTestId('places__sorting-type')).toHaveTextContent(mockOffersSortType);
  });

  it('should open and close options list when clicked on sorting type', async () => {
    const { withStoreComponent } = withStore(
      <OffersSort />,
      getMockState({
        [NameSpace.OffersData]: {
          offers: [],
          areOffersLoading: false,
          offersSortType: mockOffersSortType,
        },
      })
    );

    render(withStoreComponent);

    const sortingTypeElement = screen.getByTestId('places__sorting-type');
    await userEvent.click(sortingTypeElement);
    expect(screen.getByTestId('places__options')).toHaveClass('places__options--opened');

    await userEvent.click(sortingTypeElement);
    expect(screen.getByTestId('places__options')).not.toHaveClass('places__options--opened');
  });

  it('should change sort type when user clicks on another option', async () => {
    const newSortType = OffersSortType.PriceLowToHigh;
    const { withStoreComponent, mockStore } = withStore(
      <OffersSort />,
      getMockState({
        [NameSpace.OffersData]: {
          offers: [],
          areOffersLoading: false,
          offersSortType: mockOffersSortType,
        },
      })
    );

    render(withStoreComponent);

    await userEvent.click(screen.getByTestId('places__sorting-type'));
    await userEvent.click(screen.getByText(newSortType));
    const actions = mockStore.getActions();

    expect(actions).toEqual([
      { type: offersData.actions.setOffersSortType.type, payload: newSortType },
    ]);

    expect(screen.queryByTestId('places__options')).not.toHaveClass('places__options--opened');
  });
});

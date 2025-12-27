import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { withStore, getMockState, getMockCity, getMockSimpleOffer } from '../../../../mocks';
import { IOfferCity, NameSpace, OffersSortType } from '../../../../shared';

import { setCity } from '../../../../store/slices';

import { CitiesList } from './cities-list';

describe('Component: CitiesList', () => {
  const mockCity1 = getMockCity();
  const mockCity2 = getMockCity();

  const mockOffer1 = getMockSimpleOffer();
  mockOffer1.city = mockCity1;
  const mockOffer2 = getMockSimpleOffer();
  mockOffer2.city = mockCity2;

  const mockOffers = [mockOffer1, mockOffer2];
  const mockCurrentCity: IOfferCity = mockCity1;

  it('should render correctly', () => {
    const expectedText = mockCurrentCity.name;
    const expectedRole = 'listitem';
    const { withStoreComponent } = withStore(
      <CitiesList />,
      getMockState({
        [NameSpace.CityData]: {
          city: mockCurrentCity,
        },
        [NameSpace.OffersData]: {
          offers: mockOffers,
          areOffersLoading: false,
          offersSortType: OffersSortType.Popular,
        },
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getAllByRole(expectedRole)).toHaveLength(2);
  });

  it('should dispatch "setCity" when a city is clicked', async () => {
    const { withStoreComponent, mockStore } = withStore(
      <CitiesList />,
      getMockState({
        [NameSpace.CityData]: {
          city: mockCurrentCity,
        },
        [NameSpace.OffersData]: {
          offers: mockOffers,
          areOffersLoading: false,
          offersSortType: OffersSortType.Popular,
        },
      })
    );

    render(withStoreComponent);
    await userEvent.click(screen.getAllByRole('listitem')[1]);
    const actions = mockStore.getActions();

    expect(actions[0].type).toBe(setCity.type);
    expect(actions[0].payload).toEqual(mockCity2);
  });
});

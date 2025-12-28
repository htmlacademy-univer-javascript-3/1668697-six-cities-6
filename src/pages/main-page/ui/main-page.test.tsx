import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import { withStore, withHistory, getMockState, getMockSimpleOffer, getMockCity } from '../../../mocks';
import { NameSpace, OffersSortType } from '../../../shared';

import { MainPage } from './main-page';

vi.mock('../../../shared/hooks/use-map', () => ({
  useMap: () => null,
}));

describe('Component: MainPage', () => {
  const mockHistory = createMemoryHistory();

  it('should render correctly with offers', () => {
    const mockCity = getMockCity();
    const mockOffer1 = getMockSimpleOffer();
    mockOffer1.city = mockCity;
    const mockOffer2 = getMockSimpleOffer();
    mockOffer2.city = mockCity;

    const { withStoreComponent } = withStore(
      <MainPage />,
      getMockState({
        [NameSpace.CityData]: {
          city: mockCity,
        },
        [NameSpace.OffersData]: {
          offers: [mockOffer1, mockOffer2],
          areOffersLoading: false,
          offersSortType: OffersSortType.Popular,
        }
      })
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByRole('heading', { hidden: true, name: 'Cities' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { hidden: true, name: 'Places' })).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`2 places to stay in ${mockCity.name}`))).toBeInTheDocument();
  });

  it('should render MainEmptyPage when offers list is empty', () => {
    const mockCity = getMockCity();

    const { withStoreComponent } = withStore(
      <MainPage />,
      getMockState({
        [NameSpace.CityData]: {
          city: mockCity,
        },
        [NameSpace.OffersData]: {
          offers: [],
          areOffersLoading: false,
          offersSortType: OffersSortType.Popular,
        },
      })
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`We could not find any property available at the moment in ${mockCity.name}`))).toBeInTheDocument();
  });

  it('should filter offers by current city', () => {
    const mockCity1 = getMockCity();
    const mockCity2 = getMockCity();
    const mockOffer1 = getMockSimpleOffer();
    mockOffer1.city = mockCity1;
    const mockOffer2 = getMockSimpleOffer();
    mockOffer2.city = mockCity2;

    const { withStoreComponent } = withStore(
      <MainPage />,
      getMockState({
        [NameSpace.CityData]: {
          city: mockCity1,
        },
        [NameSpace.OffersData]: {
          offers: [mockOffer1, mockOffer2],
          areOffersLoading: false,
          offersSortType: OffersSortType.Popular,
        }
      })
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByText(new RegExp(`1 places to stay in ${mockCity1.name}`))).toBeInTheDocument();
  });
});


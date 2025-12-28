import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import { withStore, withHistory, getMockState, getMockCity } from '../../../mocks';
import { NameSpace, OffersSortType } from '../../../shared';

import { MainEmptyPage } from './main-empty-page';

describe('Component: MainEmptyPage', () => {
  const mockHistory = createMemoryHistory();
  const mockCity = getMockCity();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <MainEmptyPage city={mockCity} />,
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
    expect(screen.getByRole('heading', { hidden: true, name: 'Cities' })).toBeInTheDocument();
  });
});


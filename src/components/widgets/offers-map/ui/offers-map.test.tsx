import { render, screen } from '@testing-library/react';

import { withStore, getMockState } from '../../../../mocks';
import { MapIconType } from '../../../../shared';

import { OffersMap } from './offers-map';

vi.mock('../../../../shared/hooks/use-map', () => ({
  useMap: () => null,
}));

describe('Component: OffersMap', () => {
  const offersMapProps = {
    points: [] as [number, number, MapIconType][],
    additionalClass: 'cities__map',
  };

  it('should render correctly with testid and class', () => {
    const { withStoreComponent } = withStore(
      <OffersMap {...offersMapProps} />,
      getMockState()
    );

    render(withStoreComponent);

    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toHaveClass('map cities__map');
  });
});


import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import { withStore, withHistory, getMockState, getMockSimpleOffer } from '../../../../mocks';
import { OFFER_CARD_CLASSNAMES, OfferCardType } from '../../../../shared';

import { OffersList } from './offers-list';

describe('Component: OffersList', () => {
  const mockOffers = [getMockSimpleOffer(), getMockSimpleOffer()];
  const mockOfferCardType = OfferCardType.Main;
  const mockHistory = createMemoryHistory();

  it('should render correct', () => {
    const { withStoreComponent } = withStore(
      <OffersList offers={mockOffers} offerCardType={mockOfferCardType} />,
      getMockState()
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByTestId('offers-list-container')).toBeInTheDocument();
    expect(screen.getByTestId('offers-list-container')).toHaveClass(OFFER_CARD_CLASSNAMES[mockOfferCardType].container);
    expect(screen.getAllByTestId('offer-card')).toHaveLength(mockOffers.length);
  });
});

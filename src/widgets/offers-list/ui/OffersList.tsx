import React from 'react';

// TODO: pass as prop
import { mockOffers } from '../../../shared';
import { DEFAULT_OFFERS_LIST_LENGTH } from '../../../shared';

import { OfferCard } from '../../../entities';

interface OffersListProps {
  numberOfOffers?: number;
}

export const OffersList: React.FC<OffersListProps> = ({ numberOfOffers = DEFAULT_OFFERS_LIST_LENGTH }) => (
  <div className="cities__places-list places__list tabs__content">
    {mockOffers
      .slice(0, numberOfOffers)
      .map((offerData) => <OfferCard key={offerData.id} offerData={offerData.info} />)}
  </div>
);

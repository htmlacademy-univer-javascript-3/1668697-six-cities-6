import React from 'react';

// TODO: pass as prop
import { mockOffers } from '../../../shared';

import { OfferCard } from '../../../entities';

export const OffersList: React.FC = () => (
  <div className="cities__places-list places__list tabs__content">
    {mockOffers.map((offerData) => <OfferCard key={offerData.id} offerData={offerData.info} />)}
  </div>
);

import React from 'react';

// TODO: pass as prop
import { mockOffers } from '../../../shared';

import { SingleOfferCard } from '../../../entities';

export const OffersList: React.FC = () => (
  <div className="cities__places-list places__list tabs__content">
    {mockOffers.map((offerData) => <SingleOfferCard key={offerData.id} offerData={offerData} />)}
  </div>
);

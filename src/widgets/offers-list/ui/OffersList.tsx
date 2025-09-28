import React from 'react';

import { OfferCard } from '../../../entities';
import {
  DEFAULT_OFFERS_LIST_LENGTH,
  OFFER_CARD_CLASSNAMES
} from '../../../shared';

import { OffersListProps } from '../model/types';

export const OffersList: React.FC<OffersListProps> = ({
  offersData,
  offerCardType,
  numberOfOffers = DEFAULT_OFFERS_LIST_LENGTH
}) => (
  <div className={OFFER_CARD_CLASSNAMES[offerCardType].container}>
    {offersData
      .slice(0, numberOfOffers)
      .map((offerData) => <OfferCard key={offerData.id} offerData={offerData.info} offerCardType={offerCardType} />)}
  </div>
);

import React from 'react';

import { OfferCard } from '../../../entities';
import {
  DEFAULT_OFFERS_LIST_LENGTH,
  OFFER_CARD_CLASSNAMES,
} from '../../../shared';
import { useAppSelector, useAppDispatch } from '../../../shared';
import { setCurrentOfferId } from '../../../store/action';

import { OffersListProps } from '../model/types';

export const OffersList: React.FC<OffersListProps> = ({
  offerCardType,
  numberOfOffers = DEFAULT_OFFERS_LIST_LENGTH
}) => {
  const offersData = useAppSelector((state) => state.offers);

  const dispatch = useAppDispatch();

  const handleActiveCardIdChange = (newActiveCardId: string | undefined) => {
    dispatch(setCurrentOfferId(newActiveCardId));
  };

  return (
    <div className={OFFER_CARD_CLASSNAMES[offerCardType].container}>
      {offersData
        .slice(0, numberOfOffers)
        .map((offerData) => (
          <OfferCard
            key={offerData.id}
            id={offerData.id}
            offerData={offerData.info}
            offerCardType={offerCardType}
            handleActiveCardIdChange={handleActiveCardIdChange}
          />
        ))}
    </div>
  );
};

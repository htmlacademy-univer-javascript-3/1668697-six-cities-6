import React, { useCallback } from 'react';

import { OfferCard } from '../../../entities';
import {
  OFFER_CARD_CLASSNAMES,
} from '../../../shared';
import { useAppDispatch } from '../../../shared';
import { setCurrentOfferId } from '../../../store/slices';

import { OffersListProps } from '../model/types';

export const OffersList: React.FC<OffersListProps> = ({
  offers,
  offerCardType,
}) => {
  const dispatch = useAppDispatch();

  const handleActiveCardIdChange = useCallback(
    (newActiveCardId: string) => {
      dispatch(setCurrentOfferId(newActiveCardId));
    },
    [dispatch]
  );

  return (
    <div className={OFFER_CARD_CLASSNAMES[offerCardType].container}>
      {offers
        .map((offerData) => (
          <OfferCard
            key={offerData.id}
            id={offerData.id}
            offerData={offerData}
            offerCardType={offerCardType}
            handleActiveCardIdChange={handleActiveCardIdChange}
          />
        ))}
    </div>
  );
};

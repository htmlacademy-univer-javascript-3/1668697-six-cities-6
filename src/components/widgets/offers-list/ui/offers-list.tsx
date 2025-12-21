import React, { useCallback, useMemo } from 'react';

import { OfferCard } from '../../../entities';

import {
  OFFER_CARD_CLASSNAMES,
} from '../../../../shared';
import { useAppDispatch, useAppSelector } from '../../../../shared';

import { setCurrentOfferId, getOffersSortType } from '../../../../store/slices';

import { OffersListProps } from '../model/types';
import { getSortedOffers } from '../model/helpers';

export const OffersList: React.FC<OffersListProps> = ({
  offers,
  offerCardType,
}) => {
  const dispatch = useAppDispatch();

  const currentSortType = useAppSelector(getOffersSortType);

  const handleActiveCardIdChange = useCallback(
    (newActiveCardId: string) => {
      dispatch(setCurrentOfferId(newActiveCardId));
    },
    [dispatch]
  );

  const sortedOffers = useMemo(
    () => getSortedOffers(offers, currentSortType),
    [offers, currentSortType]
  );

  return (
    <div className={OFFER_CARD_CLASSNAMES[offerCardType].container}>
      {sortedOffers
        .map((offerData) => (
          <OfferCard
            key={offerData.id}
            id={offerData.id}
            offerData={offerData}
            offerCardType={offerCardType}
            onActiveCardIdChange={handleActiveCardIdChange}
          />
        ))}
    </div>
  );
};

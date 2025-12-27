import React from 'react';

import { OfferReview } from '../../../entities';

import { OfferReviewsListProps } from '../model/types';
import { REVIEWS_LIST_LENGTH } from '../model/constants';

export const OfferReviewsList: React.FC<OfferReviewsListProps> = ({ reviews }) => (
  <ul className="reviews__list" data-testid="reviews-list">
    {reviews
      .slice(0, REVIEWS_LIST_LENGTH)
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((reviewItem) => <OfferReview key={reviewItem.id} reviewData={reviewItem} />)}
  </ul>
);

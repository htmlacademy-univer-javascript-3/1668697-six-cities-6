import React from 'react';

import { OfferReview } from '../../../entities';

import { OfferReviewsListProps } from '../model/types';

export const OfferReviewsList: React.FC<OfferReviewsListProps> = ({ reviews }) => (
  <ul className="reviews__list">
    {reviews.map((reviewItem) => <OfferReview key={reviewItem.id} reviewData={reviewItem} />)}
  </ul>
);

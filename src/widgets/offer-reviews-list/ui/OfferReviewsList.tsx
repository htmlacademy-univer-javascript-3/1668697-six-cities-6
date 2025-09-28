import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { IOfferReview } from '../../../shared';

import { OfferReview } from '../../../entities';

interface OfferReviewsListProps {
  reviews: IOfferReview[];
}

export const OfferReviewsList: React.FC<OfferReviewsListProps> = ({ reviews }) => (
  <ul className="reviews__list">
    {reviews.map((reviewItem) => <OfferReview key={uuidv4()} reviewData={reviewItem} />)}
  </ul>
);

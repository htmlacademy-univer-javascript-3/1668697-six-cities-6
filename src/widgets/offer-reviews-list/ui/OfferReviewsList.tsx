import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { OfferReview } from '../../../entities';

import { OfferReviewsListProps } from '../model/types';

export const OfferReviewsList: React.FC<OfferReviewsListProps> = ({ reviews }) => (
  <ul className="reviews__list">
    {reviews.map((reviewItem) => <OfferReview key={uuidv4()} reviewData={reviewItem} />)}
  </ul>
);

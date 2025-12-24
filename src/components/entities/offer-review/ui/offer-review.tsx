import React from 'react';

import { getRatingPercent } from '../../../../shared';

import { getFormattedDate } from '../model/helpers';
import { OfferReviewProps } from '../model/types';

export const OfferReview: React.FC<OfferReviewProps> = ({ reviewData }) => {
  const { date, user, comment, rating } = reviewData;

  return (
    <li className="reviews__item" data-testid="review-item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" data-testid="review-avatar" />
        </div>

        <span className="reviews__user-name" data-testid="review-user-name">
          {user.name}
        </span>
      </div>

      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: getRatingPercent(rating) }} data-testid="review-rating"></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <p className="reviews__text" data-testid="review-comment">
          {comment}
        </p>

        <time className="reviews__time" dateTime={date} data-testid="review-date">{getFormattedDate(date)}</time>
      </div>
    </li>
  );
};

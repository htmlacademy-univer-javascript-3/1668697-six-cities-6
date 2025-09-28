import React from 'react';

import { IOfferReview } from '../../../shared';

interface OfferReview {
  reviewData: IOfferReview;
}

// TODO: move to helpers
const getRatingPercent = (ratingNumber: number) => {
  const ratingPercentValue = ratingNumber / 5 * 100;

  return `${ratingPercentValue}%`;
};

// TODO: move to helpers
const formatDate = (dateTime: string) => {
  const date = new Date(dateTime);

  // TODO: move to constants
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${year}`;
};

export const OfferReview: React.FC<OfferReview> = ({ reviewData }) => {
  const { name, avatar, rating, description, dateTime } = reviewData;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatar} width="54" height="54" alt="Reviews avatar" />
        </div>

        <span className="reviews__user-name">
          {name}
        </span>
      </div>

      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: getRatingPercent(rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <p className="reviews__text">
          {description}
        </p>

        <time className="reviews__time" dateTime={dateTime}>{formatDate(dateTime)}</time>
      </div>
    </li>
  );
};

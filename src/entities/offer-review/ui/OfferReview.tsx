import React from 'react';

import { IOfferReview } from '../../../shared';
import { getRatingPercent } from '../../../shared';

import { getFormattedDate } from '../model/helpers';

interface OfferReview {
  reviewData: IOfferReview;
}

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

        <time className="reviews__time" dateTime={dateTime}>{getFormattedDate(dateTime)}</time>
      </div>
    </li>
  );
};

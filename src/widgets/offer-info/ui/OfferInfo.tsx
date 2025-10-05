import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { getRatingPercent } from '../../../shared';

import { OfferInfoProps } from '../model/types';

export const OfferInfo: React.FC<OfferInfoProps> = ({ offerData }) => {
  const { features, numberOfGuests, numberOfRooms, placeType, price, rating, title, isPremium } = offerData;

  return (
    <>
      {isPremium && (
        <div className="offer__mark">
          <span>Premium</span>
        </div>
      )}

      <div className="offer__name-wrapper">
        <h1 className="offer__name">
          {title}
        </h1>

        <button className="offer__bookmark-button button" type="button">
          <svg className="offer__bookmark-icon" width="31" height="33">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>

      <div className="offer__rating rating">
        <div className="offer__stars rating__stars">
          <span style={{ width: getRatingPercent(rating) }}></span>
          <span className="visually-hidden">Rating</span>
        </div>
        <span className="offer__rating-value rating__value">{rating}</span>
      </div>

      <ul className="offer__features">
        <li className="offer__feature offer__feature--entire">
          {placeType}
        </li>
        <li className="offer__feature offer__feature--bedrooms">
          {numberOfRooms} Bedrooms
        </li>
        <li className="offer__feature offer__feature--adults">
        Max {numberOfGuests} adults
        </li>
      </ul>

      <div className="offer__price">
        <b className="offer__price-value">&euro;{price}</b>
        <span className="offer__price-text">&nbsp;night</span>
      </div>

      <div className="offer__inside">
        <h2 className="offer__inside-title">What&apos;s inside</h2>

        <ul className="offer__inside-list">

          {features.map((feature) => (
            <li key={uuidv4()} className="offer__inside-item">
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

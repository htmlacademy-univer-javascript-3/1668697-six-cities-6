import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { getRatingPercent, AppRoute, AuthStatus, useAppDispatch, useAppSelector } from '../../../shared';

import { changeFavoriteStatus } from '../../../store/async-action';
import { redirectToRoute } from '../../../store/action';
import { getAuthStatus } from '../../../store/slices';

import { OfferInfoProps } from '../model/types';

export const OfferInfo: React.FC<OfferInfoProps> = ({ offerData }) => {
  const {
    type,
    price,
    rating,
    title,
    isPremium,
    bedrooms,
    maxAdults,
    goods,
    id,
    isFavorite
  } = offerData;

  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);

  const handleBookmarkClick = () => {
    if (authStatus !== AuthStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Login));
      return;
    }

    const status = isFavorite ? 0 : 1;
    dispatch(changeFavoriteStatus({ offerId: id, status }));
  };

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

        <button
          className={`offer__bookmark-button button ${isFavorite ? 'offer__bookmark-button--active' : ''}`}
          type="button"
          onClick={handleBookmarkClick}
        >
          <svg className="offer__bookmark-icon" width="31" height="33">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
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
          {type}
        </li>
        <li className="offer__feature offer__feature--bedrooms">
          {bedrooms} {bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
        </li>
        <li className="offer__feature offer__feature--adults">
          Max {maxAdults} {maxAdults === 1 ? 'adult' : 'adults'}
        </li>
      </ul>

      <div className="offer__price">
        <b className="offer__price-value">&euro;{price}</b>
        <span className="offer__price-text">&nbsp;night</span>
      </div>

      <div className="offer__inside">
        <h2 className="offer__inside-title">What&apos;s inside</h2>

        <ul className="offer__inside-list">

          {goods.map((good) => (
            <li key={uuidv4()} className="offer__inside-item">
              {good}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

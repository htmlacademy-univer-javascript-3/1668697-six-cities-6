import classNames from 'classnames';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { OFFER_CARD_CLASSNAMES, AppRoute, AuthStatus } from '../../../../shared';
import { getRatingPercent, useAppDispatch, useAppSelector } from '../../../../shared';

import { changeFavoriteStatus } from '../../../../store/async-action';
import { redirectToRoute } from '../../../../store/action';
import { getAuthStatus } from '../../../../store/slices';

import { getOfferRouteWithId } from '../model/helpers';
import { OfferCardProps } from '../model/types';

// TODO: use on format for props
export const OfferCardComponent: React.FC<OfferCardProps> = ({ id, offerData, offerCardType, handleActiveCardIdChange }) => {
  const { title, rating, price, type, isPremium, previewImage, isFavorite } = offerData;

  const dispatch = useAppDispatch();

  const authStatus = useAppSelector(getAuthStatus);

  const handleBookmarkClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    if (authStatus !== AuthStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Login));
      return;
    }

    const status = isFavorite ? 0 : 1;
    dispatch(changeFavoriteStatus({ offerId: id, status }));
  };

  return (
    <article
      className={OFFER_CARD_CLASSNAMES[offerCardType].item}
      onMouseOver={() => handleActiveCardIdChange(id)}
      onMouseLeave={() => handleActiveCardIdChange('')}
    >
      { isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      ) }

      <div className={OFFER_CARD_CLASSNAMES[offerCardType].image}>
        <Link to={getOfferRouteWithId(id)}>
          <img className="place-card__previewImage" src={previewImage} width="260" height="200" alt="Place previewImage" />
        </Link>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <button
            className={classNames('place-card__bookmark-button button', {
              ['place-card__bookmark-button--active']: isFavorite
            })}
            type="button"
            onClick={handleBookmarkClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getRatingPercent(rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={getOfferRouteWithId(id)}>
            {title}
          </Link>
        </h2>

        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

export const OfferCard = memo(OfferCardComponent);


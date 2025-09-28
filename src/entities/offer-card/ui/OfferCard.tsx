import React from 'react';

import { OFFER_CARD_CLASSNAMES } from '../../../shared';
import { getRatingPercent } from '../../../shared';

import { OfferCardProps } from '../model/types';

export const OfferCard: React.FC<OfferCardProps> = ({ offerData, offerCardType }) => {
  const { title, rating, price, placeType, isPremium } = offerData;

  return (
    <article className={OFFER_CARD_CLASSNAMES[offerCardType].item}>
      { isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      ) }

      {/* TODO: get one image (first item from array / add preview field) */}
      <div className={OFFER_CARD_CLASSNAMES[offerCardType].image}>
        <a href="#">
          <img className="place-card__image" src="img/apartment-01.jpg" width="260" height="200" alt="Place image" />
        </a>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <button className="place-card__bookmark-button button" type="button">
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
          <a href="#">{title}</a>
        </h2>

        <p className="place-card__type">{placeType}</p>
      </div>
    </article>
  );
};

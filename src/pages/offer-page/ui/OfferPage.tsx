import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { AppRoute, IDetailedOffer, OfferCardType } from '../../../shared';
import { NEAR_OFFERS_LIST_LENGTH } from '../../../shared';
import {
  OfferGallery,
  OfferHost,
  OfferInfo,
  OfferReviewForm,
  OfferReviewsList,
  OffersList
} from '../../../widgets';

import { OfferPageProps } from '../model/types';

export const OfferPage: React.FC<OfferPageProps> = ({ offersData }) => {
  const [offerData, setOfferData] = useState<IDetailedOffer | undefined | null>(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const newOfferData = offersData.find((offer) => offer.id === id);

    if (newOfferData) {
      setOfferData(newOfferData);
    } else {
      navigate(AppRoute.NotFound);
    }
  }, [id, offersData, navigate]);

  useEffect(() => {
    window.scrollTo(0,0);
  }, [id]);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {
        offerData ? (
          <main className="page__main page__main--offer">
            <section className="offer">
              <OfferGallery images={offerData.images} />

              <div className="offer__container container">
                <div className="offer__wrapper">
                  <OfferInfo offerData={offerData.info} />
                  <OfferHost hostData={offerData.host} />

                  <section className="offer__reviews reviews">
                    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{offerData.reviews.length}</span></h2>

                    <OfferReviewsList reviews={offerData.reviews} />
                    <OfferReviewForm />
                  </section>
                </div>
              </div>

              <section className="offer__map map"></section>
            </section>

            <div className="container">
              <section className="near-places places">
                <h2 className="near-places__title">Other places in the neighbourhood</h2>

                <OffersList offerCardType={OfferCardType.Offer} offersData={offersData} numberOfOffers={NEAR_OFFERS_LIST_LENGTH} />
              </section>
            </div>
          </main>
        ) : (
          <div style={{ height: '100%', width: '100%', display: 'flex', justifyItems:'center', alignItems: 'center' }}>
            Nothing here yet...
          </div>
        )
      }
    </div>
  );
};

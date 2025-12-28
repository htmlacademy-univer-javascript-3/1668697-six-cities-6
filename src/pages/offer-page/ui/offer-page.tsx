import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  Header,
  OfferGallery,
  OfferHost,
  OfferInfo,
  OfferReviewForm,
  OfferReviewsList,
  OffersList,
  OffersMap,
  Spinner
} from '../../../components';

import { AuthStatus, getOffersPoints, OfferCardType } from '../../../shared';
import { NEAR_OFFERS_LIST_LENGTH } from '../../../shared';
import { useAppSelector, useAppDispatch } from '../../../shared';

import {
  getAuthStatus,
  getCurrentOffer,
  getCurrentOfferNearby,
  getCurrentOfferReviews,
  getIsCurrentOfferLoading
} from '../../../store/slices';
import { fetchCurrentOffer } from '../../../store/async-action';

import './offer-page.css';

export const OfferPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchCurrentOffer({ offerId: id }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo(0,0);
  }, [id]);

  const authStatus = useAppSelector(getAuthStatus);

  const isCurrentOfferLoading = useAppSelector(getIsCurrentOfferLoading);

  const currentOfferData = useAppSelector(getCurrentOffer);
  const currentOfferReviews = useAppSelector(getCurrentOfferReviews);
  const currentOfferNearby = useAppSelector(getCurrentOfferNearby);

  const nearbyOffersData = currentOfferNearby.slice(0, NEAR_OFFERS_LIST_LENGTH);

  if (!currentOfferData || isCurrentOfferLoading) {
    return <Spinner />;
  }

  const mapOffers = [
    currentOfferData,
    ...nearbyOffersData,
  ];

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery images={currentOfferData.images} />

          <div className="offer__container container">
            <div className="offer__wrapper">
              <OfferInfo offerData={currentOfferData} />
              <OfferHost hostData={currentOfferData.host} description={currentOfferData.description} />

              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot; <span className="reviews__amount" data-testid="reviews-amount">{currentOfferReviews.length}</span>
                </h2>

                <OfferReviewsList reviews={currentOfferReviews} />

                {authStatus === AuthStatus.Auth && <OfferReviewForm offerId={id} />}
              </section>
            </div>
          </div>

          <OffersMap points={getOffersPoints(mapOffers, id)} additionalClass='offer__map' />
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>

            <OffersList
              offers={nearbyOffersData}
              offerCardType={OfferCardType.Offer}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

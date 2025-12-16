import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getOffersPoints, OfferCardType } from '../../../shared';
import { NEAR_OFFERS_LIST_LENGTH } from '../../../shared';
import { useAppSelector, useAppDispatch } from '../../../shared';

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
} from '../../../widgets';

import { fetchCurrentOffer } from '../../../store/async-action';

import './OfferPage.css';

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

  const isCurrentOfferLoading = useAppSelector((state) => state.isCurrentOfferLoading);

  const currentOfferData = useAppSelector((state) => state.currentOffer);
  const currentOfferReviews = useAppSelector((state) => state.currentOfferReviews);
  const currentOfferNearby = useAppSelector((state) => state.currentOfferNearby);

  const nearbyOffersData = currentOfferNearby.slice(0, NEAR_OFFERS_LIST_LENGTH);

  if (!currentOfferData || isCurrentOfferLoading) {
    return <Spinner />;
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery images={currentOfferData.images} />

          <div className="offer__container container">
            <div className="offer__wrapper">
              <OfferInfo offerData={currentOfferData} />
              <OfferHost hostData={currentOfferData.host} />

              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                        Reviews &middot; <span className="reviews__amount">{currentOfferReviews.length}</span>
                </h2>

                <OfferReviewsList reviews={currentOfferReviews} />

                <OfferReviewForm />
              </section>
            </div>
          </div>

          <OffersMap points={getOffersPoints(nearbyOffersData, id)} additionalClass='offer__map' />
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

import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { AppRoute, getOffersPoints, OfferCardType } from '../../../shared';
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

// TODO: add detailedDataOffer
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

  const currentOfferData = useAppSelector((state) => state.currentOffer);
  const currentOfferReviews = useAppSelector((state) => state.currentOfferReviews);
  const isCurrentOfferLoading = useAppSelector((state) => state.isCurrentOfferLoading);

  if (!currentOfferData || isCurrentOfferLoading) {
    return <Spinner />;
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        {
          !currentOfferData ? (
            <div className="offer-empty">
              <div className="offer-empty__message">Nothing here yet...</div>

              <Link to={AppRoute.Main} className="offer-empty__back" >Back To Home</Link>
            </div>
          ) : (
            <>
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

                {/* TODO: */}
                {/* <OffersMap points={getOffersPoints(nearbyOffersData, currentOfferId)} additionalClass='offer__map' /> */}
              </section>

              <div className="container">
                <section className="near-places places">
                  <h2 className="near-places__title">Other places in the neighbourhood</h2>

                  {/* TODO: */}
                  {/* <OffersList
                    offers={nearbyOffersData}
                    offerCardType={OfferCardType.Offer}
                    numberOfOffers={NEAR_OFFERS_LIST_LENGTH}
                  /> */}
                </section>
              </div>
            </>
          )
        }
      </main>
    </div>
  );
};

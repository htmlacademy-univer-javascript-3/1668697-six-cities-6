import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { AppRoute, getOffersPoints, IDetailedOffer, OfferCardType } from '../../../shared';
import { NEAR_OFFERS_LIST_LENGTH } from '../../../shared';
import {
  Header,
  OfferGallery,
  OfferHost,
  OfferInfo,
  OfferReviewForm,
  OfferReviewsList,
  OffersList,
  OffersMap
} from '../../../widgets';

import { OfferPageProps } from '../model/types';

import { cityMocks } from '../../../mocks/cityMocks';

import './OfferPage.css';
import { getCurrentData } from '../model/helpers';

export const OfferPage: React.FC<OfferPageProps> = ({ offersData }) => {
  const [offerData, setOfferData] = useState<IDetailedOffer | undefined | null>(null);
  const [nearbyOffersData, setNearbyOffersData] = useState<IDetailedOffer[]>([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const { newOfferData, newNearbyOffersData } = getCurrentData(id, offersData);

      setOfferData(newOfferData);
      setNearbyOffersData(newNearbyOffersData);
    } else {
      navigate(AppRoute.NotFound);
    }
  }, [id, offersData, navigate]);

  useEffect(() => {
    window.scrollTo(0,0);
  }, [id]);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        {
          !offerData ? (
            <div className="offer-empty">
              <div className="offer-empty__message">Nothing here yet...</div>

              <Link to={AppRoute.Main} className="offer-empty__back" >Back To Home</Link>
            </div>
          ) : (
            <>
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

                <OffersMap city={cityMocks.Amsterdam} points={getOffersPoints(nearbyOffersData)} additionalClass='offer__map' />
              </section>

              <div className="container">
                <section className="near-places places">
                  <h2 className="near-places__title">Other places in the neighbourhood</h2>

                  <OffersList
                    offerCardType={OfferCardType.Offer}
                    offersData={nearbyOffersData}
                    numberOfOffers={NEAR_OFFERS_LIST_LENGTH}
                  />
                </section>
              </div>
            </>
          )
        }
      </main>
    </div>
  );
};

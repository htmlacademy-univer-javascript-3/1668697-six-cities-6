import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { AppRoute, getOffersPoints, IDetailedOffer, ISimpleOfferInfo, OfferCardType } from '../../../shared';
import { NEAR_OFFERS_LIST_LENGTH } from '../../../shared';
import { useAppSelector } from '../../../shared';
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

import { getCurrentData } from '../model/helpers';

import './OfferPage.css';

// TODO: add detailedDataOffer
export const OfferPage: React.FC = () => {
  const [offerData, setOfferData] = useState<ISimpleOfferInfo | undefined | null>(null);
  const [nearbyOffersData, setNearbyOffersData] = useState<ISimpleOfferInfo[]>([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const offersData = useAppSelector((state) => state.offers);
  const currentOfferId = useAppSelector((state) => state.currentOfferId);

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
                {/* TODO: */}
                {/* <OfferGallery images={offerData.images} /> */}

                <div className="offer__container container">
                  <div className="offer__wrapper">
                    <OfferInfo offerData={offerData} />
                    {/* TODO: */}
                    {/* <OfferHost hostData={offerData.host} /> */}

                    <section className="offer__reviews reviews">
                      {/* TODO: */}
                      {/* <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{offerData.reviews.length}</span></h2> */}

                      {/* TODO: */}
                      {/* <OfferReviewsList reviews={offerData.reviews} /> */}
                      <OfferReviewForm />
                    </section>
                  </div>
                </div>

                <OffersMap points={getOffersPoints(nearbyOffersData, currentOfferId)} additionalClass='offer__map' />
              </section>

              <div className="container">
                <section className="near-places places">
                  <h2 className="near-places__title">Other places in the neighbourhood</h2>

                  <OffersList
                    offers={nearbyOffersData}
                    offerCardType={OfferCardType.Offer}
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

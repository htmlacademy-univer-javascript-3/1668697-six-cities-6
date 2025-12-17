import React from 'react';

import { OfferCardType, getOffersPoints, useAppSelector } from '../../../shared';
import { OffersList, OffersMap, Header, CitiesList , OffersSort } from '../../../widgets';

import { getCity, getCurrentOfferId, getOffers } from '../../../store/slices';

export const MainPage: React.FC = () => {
  const city = useAppSelector(getCity);
  const offersData = useAppSelector(getOffers);
  const currentOfferId = useAppSelector(getCurrentOfferId);

  const currentOffers = offersData.filter((offer) => offer.city.name === city.name);
  const offersCount = currentOffers.length;

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <CitiesList />

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>

              <b className="places__found">{offersCount} places to stay in {city.name}</b>

              <OffersSort />

              <OffersList
                offers={currentOffers}
                offerCardType={OfferCardType.Main}
              />

            </section>

            <div className="cities__right-section">
              <OffersMap
                points={getOffersPoints(currentOffers, currentOfferId)}
                additionalClass='cities__map map_full'
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

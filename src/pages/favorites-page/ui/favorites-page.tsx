import React, { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { OfferCardType, IOfferCity, ISimpleOfferInfo, AppRoute, useAppDispatch, useAppSelector } from '../../../shared';

import { getFavorites, getAreFavoritesLoading, setCity } from '../../../store/slices';

import { OffersList, Header, Spinner } from '../../../widgets';

import { FavoritesEmptyPage } from '../../favorites-empty-page';

export const FavoritesPage: React.FC = () => {
  const favorites = useAppSelector(getFavorites);
  const areFavoritesLoading = useAppSelector(getAreFavoritesLoading);

  const dispatch = useAppDispatch();

  const favoritesByCity = useMemo(() => {
    const grouped: Record<string, { city: IOfferCity; offers: ISimpleOfferInfo[] }> = {};

    favorites.forEach((offer) => {
      const cityName = offer.city.name;

      if (!grouped[cityName]) {
        grouped[cityName] = {
          city: offer.city,
          offers: [],
        };
      }

      grouped[cityName].offers.push(offer);
    });

    return Object.values(grouped).sort((a, b) => a.city.name.localeCompare(b.city.name));
  }, [favorites]);

  const handleCityClick = useCallback(
    (city: IOfferCity) => {
      dispatch(setCity(city));
    },
    [dispatch]
  );

  if (areFavoritesLoading) {
    return <Spinner />;
  }

  if (favorites.length === 0) {
    return <FavoritesEmptyPage />;
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>

            <ul className="favorites__list">
              {favoritesByCity.map(({ city, offers }) => (
                <li key={city.name} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link
                        className="locations__item-link"
                        to={AppRoute.Main}
                        onClick={() => handleCityClick(city)}
                      >
                        <span>{city.name}</span>
                      </Link>
                    </div>
                  </div>

                  <OffersList offers={offers} offerCardType={OfferCardType.Favorites} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <footer className="footer">
        <Link to={AppRoute.Main} className="footer__logo-link">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
};

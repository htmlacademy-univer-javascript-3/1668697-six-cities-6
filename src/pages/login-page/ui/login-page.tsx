import React from 'react';
import { Link } from 'react-router-dom';

import { Header, LoginForm } from '../../../components';

import { AppRoute, AuthStatus, ISimpleOfferInfo } from '../../../shared';
import { useAppDispatch, useAppSelector, getCitiesData } from '../../../shared';

import { getAuthStatus, getOffers, setCity } from '../../../store/slices';
import { redirectToRoute } from '../../../store/action';

const getRandomCity = (offers: ISimpleOfferInfo[]) => {
  const cities = getCitiesData(offers);

  return cities[Math.floor(Math.random() * cities.length)];
};

export const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector(getAuthStatus);
  const offers = useAppSelector(getOffers);

  const randomCity = getRandomCity(offers);

  if (authStatus === AuthStatus.Auth) {
    dispatch(redirectToRoute(AppRoute.Main));
    return;
  }

  const handleCityButtonClick = () => {
    dispatch(setCity(randomCity));
  };

  return (
    <div className="page page--gray page--login">
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>

            <LoginForm />
          </section>

          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link to={AppRoute.Main} className="locations__item-link" onClick={handleCityButtonClick}>
                <span>{randomCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

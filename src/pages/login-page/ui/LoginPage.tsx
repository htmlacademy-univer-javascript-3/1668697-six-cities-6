import React from 'react';

import { Header, LoginForm } from '../../../widgets';
import { AppRoute, AuthStatus } from '../../../shared';
import { useAppDispatch, useAppSelector } from '../../../shared';

import { getCity, getAuthStatus } from '../../../store/slices';
import { redirectToRoute } from '../../../store/action';

export const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const city = useAppSelector(getCity);
  const authStatus = useAppSelector(getAuthStatus);

  if (authStatus === AuthStatus.Auth) {
    dispatch(redirectToRoute(AppRoute.Main));
    return;
  }

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
              <a className="locations__item-link" href="#">
                <span>{city.name}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

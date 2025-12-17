import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute, AuthStatus } from '../../../shared';
import { useAppSelector, useAppDispatch } from '../../../shared';

import { authLogout } from '../../../store/async-action';
import { getAuthStatus, getName } from '../../../store/slices';

export const HeaderComponent: React.FC = () => {
  const authStatus = useAppSelector(getAuthStatus);
  const name = useAppSelector(getName);

  const dispatch = useAppDispatch();

  return (
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
              {authStatus === AuthStatus.Auth && (
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span className="header__user-name user__name">{name}</span>
                    {/* TODO: Add favorite-count */}
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
              )}

              {authStatus === AuthStatus.Auth ? (
                <li className="header__nav-item">
                  <Link
                    to={AppRoute.Main}
                    className="header__nav-link"
                    onClick={(e) => {
                      e.preventDefault();

                      dispatch(authLogout());
                    }}
                  >
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              ) : (
                <li className="header__nav-item">
                  <Link
                    to={AppRoute.Login}
                    className="header__nav-link"
                  >
                    <span className="header__signout">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export const Header = memo(HeaderComponent);

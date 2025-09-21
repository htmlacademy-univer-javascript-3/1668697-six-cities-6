import React from 'react';

import '../../../../public/css/not-found.css';

export const NotFoundPage: React.FC = () => (
  <div className="page page--not-found">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link" href="main.html">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a className="header__nav-link header__nav-link--profile" href="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  <span className="header__favorite-count">3</span>
                </a>
              </li>
              <li className="header__nav-item">
                <a className="header__nav-link" href="#">
                  <span className="header__signout">Sign out</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <main className="page__main page__main--not-found">
      <section className="not-found">
        <h1 className='not-found__title'>404</h1>
        <div className='not-found__subtitle'>Nothing here yet...</div>

        <a className='not-found__back' href="#">Back To Home</a>
      </section>
    </main>
  </div>
);

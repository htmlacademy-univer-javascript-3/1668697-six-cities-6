import React from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '../../../shared';
import { Header } from '../../../widgets';

import './NotFoundPage.css';

export const NotFoundPage: React.FC = () => (
  <div className="page page--not-found">
    <Header />

    <main className="page__main page__main--not-found">
      <section className="not-found">
        <h1 className='not-found__title'>404</h1>
        <div className='not-found__subtitle'>Nothing here yet...</div>

        <Link to={AppRoute.Main} className='not-found__back' >Back To Home</Link>
      </section>
    </main>
  </div>
);

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { MainPage, LoginPage, FavoritesPage, OfferPage, NotFoundPage } from '../pages';

import { AppRoute, PrivateRoute, AuthorizationStatus, IDetailedOffer } from '../shared';
import { TOTAL_NUMBER_OF_OFFERS } from '../shared';

interface AppProps {
  offersData: IDetailedOffer[];
}

const App: React.FC<AppProps> = ({ offersData }) => (
  <BrowserRouter>
    <Routes>
      <Route
        path={AppRoute.Main}
        element={
          <MainPage offersData={offersData} offersCount={TOTAL_NUMBER_OF_OFFERS} />
        }
      />
      <Route path={AppRoute.Login} element={<LoginPage />} />
      <Route path={AppRoute.Offer} element={<OfferPage offersData={offersData} />} />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <FavoritesPage offersData={offersData} />
          </PrivateRoute>
        }
      />

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;

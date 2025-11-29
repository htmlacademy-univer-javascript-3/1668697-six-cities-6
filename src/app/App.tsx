import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { MainPage, LoginPage, FavoritesPage, OfferPage, NotFoundPage } from '../pages';

import { AppRoute, PrivateRoute, AuthorizationStatus } from '../shared';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path={AppRoute.Main}
        element={
          <MainPage />
        }
      />
      <Route path={AppRoute.Login} element={<LoginPage />} />
      <Route path={AppRoute.Offer} element={<OfferPage />} />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <FavoritesPage />
          </PrivateRoute>
        }
      />

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;

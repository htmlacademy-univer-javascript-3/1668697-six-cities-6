import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { MainPage, LoginPage, FavoritesPage, OfferPage, NotFoundPage } from '../pages';

import { AppRoute, PrivateRoute, AuthorizationStatus } from '../shared';
import { useAppDispatch, useAppSelector } from '../shared';

import { fetchOffers } from '../store/async-action';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.isLoading);

  if (isLoading) {
    dispatch(fetchOffers());

    // TODO: Add Loader component
    return <div>Loading</div>;
  }

  return (
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
};

export default App;

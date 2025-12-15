import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { MainPage, LoginPage, FavoritesPage, OfferPage, NotFoundPage } from '../pages';
import { Spinner } from '../widgets';

import { AppRoute, PrivateRoute } from '../shared';
import { useAppDispatch, useAppSelector } from '../shared';

import { fetchOffers, authCheck } from '../store/async-action';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.isLoading);

  if (isLoading) {
    dispatch(fetchOffers());

    return <Spinner />;
  }

  dispatch(authCheck());

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
            <PrivateRoute>
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

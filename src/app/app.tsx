import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { MainPage, LoginPage, FavoritesPage, OfferPage, NotFoundPage } from '../pages';
import { Spinner, ErrorModal, PrivateRoute } from '../components';

import { AppRoute } from '../shared';
import { useAppDispatch, useAppSelector } from '../shared';

import { fetchOffers, authCheck } from '../store/async-action';
import { getAreOffersLoading } from '../store/slices';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const areOffersLoading = useAppSelector(getAreOffersLoading);

  if (areOffersLoading) {
    dispatch(fetchOffers());

    return <Spinner />;
  }

  dispatch(authCheck());

  return (
    <>
      <ErrorModal />

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
    </>
  );
};

export default App;

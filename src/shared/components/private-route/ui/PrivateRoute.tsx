import React from 'react';
import { Navigate } from 'react-router-dom';

import { AppRoute } from '../../../constants';
import { AuthStatus } from '../../../types';

import { useAppSelector } from '../../../hooks';

import { PrivateRouteProps } from '../model/types';

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const authStatus = useAppSelector((state) => state.authStatus);

  return (
    authStatus === AuthStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
};

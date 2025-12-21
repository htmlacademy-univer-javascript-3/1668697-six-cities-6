import React from 'react';
import { Navigate } from 'react-router-dom';

import { AppRoute } from '../../../../shared/constants';
import { AuthStatus } from '../../../../shared/types';

import { useAppSelector } from '../../../../shared/hooks';

import { getAuthStatus } from '../../../../store/slices';

import { PrivateRouteProps } from '../model/types';

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const authStatus = useAppSelector(getAuthStatus);

  return (
    authStatus === AuthStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
};

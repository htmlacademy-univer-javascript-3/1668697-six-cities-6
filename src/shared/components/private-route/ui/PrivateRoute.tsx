import React from 'react';
import { Navigate } from 'react-router-dom';

import { AppRoute } from '../../../constants';
import { AuthorizationStatus } from '../../../types';

import { PrivateRouteProps } from '../model/types';

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ authorizationStatus, children }) => (
  authorizationStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to={AppRoute.Login} />
);

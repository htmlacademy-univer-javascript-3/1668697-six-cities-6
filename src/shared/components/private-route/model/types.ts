import { AuthorizationStatus } from '../../../types';

export interface PrivateRouteProps {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

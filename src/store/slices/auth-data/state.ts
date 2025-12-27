import { AuthStatus } from '../../../shared/types/auth-types';

export interface IAuthData {
  authStatus: AuthStatus;
  email: string;
}

export const initialState: IAuthData = {
  authStatus: AuthStatus.Unknown,
  email: '',
};

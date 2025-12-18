import { AuthStatus } from '../../../shared';

export interface IAuthData {
  authStatus: AuthStatus;
  email: string;
}

export const initialState: IAuthData = {
  authStatus: AuthStatus.Unknown,
  email: '',
};

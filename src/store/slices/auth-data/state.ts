import { AuthStatus } from '../../../shared';

export interface IAuthData {
  authStatus: AuthStatus;
  name: string;
}

export const initialState: IAuthData = {
  authStatus: AuthStatus.Unknown,
  name: '',
};

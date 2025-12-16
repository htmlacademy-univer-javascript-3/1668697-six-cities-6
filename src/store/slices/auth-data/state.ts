import { AuthStatus } from '../../../shared';

interface IAuthData {
  authStatus: AuthStatus;
  name: string;
}

export const initialState: IAuthData = {
  authStatus: AuthStatus.Unknown,
  name: '',
};

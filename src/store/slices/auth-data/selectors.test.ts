import { AuthStatus, NameSpace } from '../../../shared';
import { getAuthStatus, getEmail } from './selectors';

describe('AuthData selectors', () => {
  const state = {
    [NameSpace.AuthData]: {
      authStatus: AuthStatus.Auth,
      email: '',
    }
  };

  it('should return authStatus from state', () => {
    const { authStatus } = state[NameSpace.AuthData];
    const result = getAuthStatus(state);
    expect(result).toBe(authStatus);
  });

  it('should return authStatus from state', () => {
    const { email } = state[NameSpace.AuthData];
    const result = getEmail(state);
    expect(result).toBe(email);
  });
});

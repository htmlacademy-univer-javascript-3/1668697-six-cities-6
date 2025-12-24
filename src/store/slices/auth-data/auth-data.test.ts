import { authData } from './auth-data';
import { authCheck, authLogin, authLogout } from '../../async-action';

import { AuthStatus } from '../../../shared';
import { getMockUser } from '../../../mocks';

describe('AuthData slice', () => {
  const initialState = {
    authStatus: AuthStatus.Unknown,
    email: '',
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      authStatus: AuthStatus.NoAuth,
      email: '',
    };

    const result = authData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      authStatus: AuthStatus.Unknown,
      email: '',
    };

    const result = authData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('"authCheck.fulfilled" should set email and authStatus to "Auth" when payload contains user data', () => {
    const mockUser = getMockUser();
    const expectedState = {
      authStatus: AuthStatus.Auth,
      email: mockUser.email,
    };

    const result = authData.reducer(
      initialState,
      authCheck.fulfilled(mockUser, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('"authCheck.fulfilled" should set email to "" and authStatus to "NoAuth" when payload contains no data', () => {
    const expectedState = {
      authStatus: AuthStatus.NoAuth,
      email: '',
    };

    const result = authData.reducer(initialState, authCheck.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('"authCheck.rejected" should set email to "" and authStatus to "NoAuth"', () => {
    const expectedState = {
      authStatus: AuthStatus.NoAuth,
      email: '',
    };

    const result = authData.reducer(initialState, authCheck.rejected);

    expect(result).toEqual(expectedState);
  });

  it('"authLogin.fulfilled" should set email and authStatus to "Auth"', () => {
    const mockUser = getMockUser();
    const expectedState = {
      authStatus: AuthStatus.Auth,
      email: mockUser.email,
    };

    const result = authData.reducer(
      initialState,
      authCheck.fulfilled(mockUser, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('"authLogin.rejected" should set email to "" and authStatus to "NoAuth"', () => {
    const expectedState = {
      authStatus: AuthStatus.NoAuth,
      email: '',
    };

    const result = authData.reducer(initialState, authLogin.rejected);

    expect(result).toEqual(expectedState);
  });

  it('"authLogout.fulfilled" should set email to "" and authStatus to "NoAuth"', () => {
    const expectedState = {
      authStatus: AuthStatus.NoAuth,
      email: '',
    };

    const result = authData.reducer(initialState, authLogout.fulfilled);

    expect(result).toEqual(expectedState);
  });
});

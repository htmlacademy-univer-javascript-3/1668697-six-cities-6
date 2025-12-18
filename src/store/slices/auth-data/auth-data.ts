import { createSlice } from '@reduxjs/toolkit';

import { AuthStatus } from '../../../shared';
import { NameSpace } from '../../../shared';

import { authCheck, authLogin, authLogout } from '../../async-action';

import { initialState } from './state';

export const authData = createSlice({
  name: NameSpace.AuthData,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authCheck.fulfilled, (state, action) => {
        if (action.payload) {
          state.email = action.payload.email;
          state.authStatus = AuthStatus.Auth;
        } else {
          state.email = '';
          state.authStatus = AuthStatus.NoAuth;
        }
      })
      .addCase(authCheck.rejected, (state) => {
        state.email = '';
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.authStatus = AuthStatus.Auth;
      })
      .addCase(authLogin.rejected, (state) => {
        state.email = '';
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(authLogout.fulfilled, (state) => {
        state.email = '';
        state.authStatus = AuthStatus.NoAuth;
      });
  },
});


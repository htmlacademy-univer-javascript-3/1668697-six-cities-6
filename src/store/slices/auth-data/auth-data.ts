import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthStatus } from '../../../shared';
import { NameSpace } from '../../../shared';

import { initialState } from './state';

export const authData = createSlice({
  name: NameSpace.AuthData,
  initialState,
  reducers: {
    setAuthStatus: (state, action: PayloadAction<AuthStatus>) => {
      state.authStatus = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});


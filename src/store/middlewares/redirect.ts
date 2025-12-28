import { Middleware } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';

import { rootReducer } from '../root-reducer';
import { redirectToRoute } from '../action';

import { browserHistory } from '../../browser-history';

type RootReducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, RootReducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === redirectToRoute.type) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };

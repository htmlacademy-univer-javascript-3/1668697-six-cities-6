import { Middleware } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';

import { rootReducer } from '../root-reducer';

import { browserHistory } from '../../browserHistory';

type RootReducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, RootReducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'route/redirect') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };

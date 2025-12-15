import { Middleware } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';

import { reducer } from '../reducer';

import { browserHistory } from '../../browserHistory';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'route/redirect') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };

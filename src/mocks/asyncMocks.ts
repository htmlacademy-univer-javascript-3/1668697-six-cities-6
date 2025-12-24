import { Action } from 'redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

import { StateType } from '../shared';

import { createAPI } from '../service/api';

export type AppThunkDispatch = ThunkDispatch<StateType, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

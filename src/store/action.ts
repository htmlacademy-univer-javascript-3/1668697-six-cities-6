import { createAction } from '@reduxjs/toolkit';

import { AppRoute } from '../shared';

export const redirectToRoute = createAction<AppRoute>('route/redirect');

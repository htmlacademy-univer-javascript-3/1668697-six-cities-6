import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from '@reduxjs/toolkit';

import { browserHistory } from '../../browser-history';
import { AppRoute, StateType } from '../../shared';

import { redirectToRoute } from '../action';
import { redirect } from './redirect';

vi.mock('../../browser-history', () => ({
  browserHistory: {
    location: { pathname: ''},
    push(path: string) {
      this.location.pathname = path;
    }
  }
}));

describe('Redirect middleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<StateType, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('should redirect to "/login" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Login);

    store.dispatch(redirectAction);

    expect(browserHistory.location.pathname).toBe(AppRoute.Login);
  });

  it('should not redirect to "/login" with empty action', () => {
    const emptyAction = { type: '', payload: AppRoute.Login };

    store.dispatch(emptyAction);

    expect(browserHistory.location.pathname).not.toBe(AppRoute.Login);
  });
});

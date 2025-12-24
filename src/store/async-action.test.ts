import { Action } from 'redux';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { createAPI } from '../service/api';

import { ApiRoute, StateType } from '../shared';
import { AppThunkDispatch, extractActionsTypes, getMockSimpleOffer, getMockReview } from '../mocks';

import { fetchOffers, fetchReviews } from './async-action';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<StateType, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({}); // TODO: add data?
  });

  afterEach(() => {
    mockAxiosAdapter.reset();
  });

  describe('fetchOffers action', () => {
    it('should dispatch "fetchOffers.pending" and "fetchOffers.fulfilled" & return offers data, when server response 200', async () => {
      const mockOffers = [getMockSimpleOffer(), getMockSimpleOffer()];
      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffers());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffers.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffers.pending.type,
        fetchOffers.fulfilled.type,
      ]);

      expect(fetchOffersFulfilled.payload)
        .toEqual(mockOffers);
    });

    it('should dispatch "fetchOffers.pending" and "fetchOffers.rejected", when server response 500', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(500);

      await store.dispatch(fetchOffers());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchOffers.pending.type,
        fetchOffers.rejected.type,
      ]);
    });
  });

  describe('fetchReviews action', () => {
    it('should dispatch "fetchReviews.pending" and "fetchReviews.fulfilled" & return reviews data, when server response 200', async () => {
      const offerId = 'test-offer-id';
      const mockReviews = [getMockReview(), getMockReview()];
      mockAxiosAdapter.onGet(`${ApiRoute.Reviews}/${offerId}`).reply(200, mockReviews);

      await store.dispatch(fetchReviews({ offerId }));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviews.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReviews.pending.type,
        fetchReviews.fulfilled.type,
      ]);

      expect(fetchReviewsFulfilled.payload)
        .toEqual(mockReviews);
    });

    it('should dispatch "fetchReviews.pending" and "fetchReviews.rejected", when server response 404', async () => {
      const offerId = 'test-offer-id';
      mockAxiosAdapter.onGet(`${ApiRoute.Reviews}/${offerId}`).reply(404);

      await store.dispatch(fetchReviews({ offerId }));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchReviews.pending.type,
        fetchReviews.rejected.type,
      ]);
    });
  });
});



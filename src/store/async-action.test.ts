import { Action } from 'redux';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { vi } from 'vitest';

import { createAPI } from '../service/api';
import * as tokenStorage from '../service/token';

import { ApiRoute, StateType } from '../shared';
import { AppThunkDispatch, extractActionsTypes, getMockSimpleOffer, getMockReview, getMockDetailedOffer, getMockUser } from '../mocks';

import { fetchOffers, fetchReviews, fetchNearby, fetchCurrentOffer, fetchFavorites, changeFavoriteStatus, postReview, authCheck, authLogin, authLogout } from './async-action';
import { redirectToRoute } from './action';
import { setError } from './slices/error-data';

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

  describe('fetchNearby action', () => {
    it('should dispatch "fetchNearby.pending" and "fetchNearby.fulfilled" & return nearby offers data, when server response 200', async () => {
      const offerId = 'test-offer-id';
      const mockNearbyOffers = [getMockSimpleOffer(), getMockSimpleOffer()];
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${offerId}/${ApiRoute.Nearby}`).reply(200, mockNearbyOffers);

      await store.dispatch(fetchNearby({ offerId }));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchNearbyFulfilled = emittedActions.at(1) as ReturnType<typeof fetchNearby.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchNearby.pending.type,
        fetchNearby.fulfilled.type,
      ]);

      expect(fetchNearbyFulfilled.payload)
        .toEqual(mockNearbyOffers);
    });

    it('should dispatch "fetchNearby.pending" and "fetchNearby.rejected", when server response 404', async () => {
      const offerId = 'test-offer-id';
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${offerId}/${ApiRoute.Nearby}`).reply(404);

      await store.dispatch(fetchNearby({ offerId }));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchNearby.pending.type,
        fetchNearby.rejected.type,
      ]);
    });
  });

  describe('fetchCurrentOffer action', () => {
    it('should dispatch "fetchCurrentOffer.pending" and "fetchCurrentOffer.fulfilled" & return offer data, when server response 200', async () => {
      const offerId = 'test-offer-id';
      const mockDetailedOffer = getMockDetailedOffer();
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${offerId}`).reply(200, mockDetailedOffer);
      mockAxiosAdapter.onGet(`${ApiRoute.Reviews}/${offerId}`).reply(200, []);
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${offerId}/${ApiRoute.Nearby}`).reply(200, []);

      await store.dispatch(fetchCurrentOffer({ offerId }));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchCurrentOfferFulfilled = emittedActions.find(
        (action) => action.type === fetchCurrentOffer.fulfilled.type
      ) as ReturnType<typeof fetchCurrentOffer.fulfilled>;

      expect(extractedActionsTypes[0]).toBe(fetchCurrentOffer.pending.type);
      expect(extractedActionsTypes).toContain(fetchReviews.pending.type);
      expect(extractedActionsTypes).toContain(fetchNearby.pending.type);
      expect(extractedActionsTypes).toContain(fetchCurrentOffer.fulfilled.type);

      expect(fetchCurrentOfferFulfilled.payload)
        .toEqual(mockDetailedOffer);
    });

    it('should dispatch "fetchCurrentOffer.pending", "redirectToRoute", "fetchCurrentOffer.rejected", when server response 404', async () => {
      const offerId = 'test-offer-id';
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${offerId}`).reply(404);

      await store.dispatch(fetchCurrentOffer({ offerId }));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchCurrentOffer.pending.type,
        redirectToRoute.type,
        fetchCurrentOffer.rejected.type,
      ]);
    });
  });

  describe('fetchFavorites action', () => {
    it('should dispatch "fetchFavorites.pending" and "fetchFavorites.fulfilled" & return favorites data, when server response 200', async () => {
      const mockFavorites = [getMockSimpleOffer(), getMockSimpleOffer()];
      mockAxiosAdapter.onGet(ApiRoute.Favorites).reply(200, mockFavorites);

      await store.dispatch(fetchFavorites());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoritesFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavorites.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFavorites.pending.type,
        fetchFavorites.fulfilled.type,
      ]);

      expect(fetchFavoritesFulfilled.payload)
        .toEqual(mockFavorites);
    });

    it('should dispatch "fetchFavorites.pending" and "fetchFavorites.rejected", when server response 401', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Favorites).reply(401);

      await store.dispatch(fetchFavorites());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchFavorites.pending.type,
        fetchFavorites.rejected.type,
      ]);
    });
  });

  describe('changeFavoriteStatus action', () => {
    const offerId = 'test-offer-id';
    const status = 1;

    it('should dispatch "changeFavoriteStatus.pending", "fetchFavorites.pending", "changeFavoriteStatus.fulfilled" & return offer data, when server response 201', async () => {
      const mockDetailedOffer = getMockDetailedOffer();
      mockAxiosAdapter.onPost(`${ApiRoute.Favorites}/${offerId}/${status}`).reply(201, mockDetailedOffer);
      mockAxiosAdapter.onGet(ApiRoute.Favorites).reply(200, []);

      await store.dispatch(changeFavoriteStatus({ offerId, status }));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const changeFavoriteStatusFulfilled = emittedActions.find(
        (action) => action.type === changeFavoriteStatus.fulfilled.type
      ) as ReturnType<typeof changeFavoriteStatus.fulfilled>;

      expect(extractedActionsTypes[0]).toBe(changeFavoriteStatus.pending.type);
      expect(extractedActionsTypes).toContain(fetchFavorites.pending.type);
      expect(extractedActionsTypes).toContain(changeFavoriteStatus.fulfilled.type);

      expect(changeFavoriteStatusFulfilled.payload)
        .toEqual(mockDetailedOffer);
    });

    it.each([400, 401, 404, 409])('should dispatch "changeFavoriteStatus.pending" and "changeFavoriteStatus.rejected", when server response %i', async (statusCode) => {
      mockAxiosAdapter.onPost(`${ApiRoute.Favorites}/${offerId}/${status}`).reply(statusCode);

      await store.dispatch(changeFavoriteStatus({ offerId, status }));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        changeFavoriteStatus.pending.type,
        changeFavoriteStatus.rejected.type,
      ]);
    });
  });

  describe('postReview action', () => {
    const offerId = 'test-offer-id';
    const reviewData = {
      offerId,
      comment: 'test comment',
      rating: 5,
    };

    it('should dispatch "postReview.pending", "fetchReviews.pending", "postReview.fulfilled" & return offerId, when server response 201', async () => {
      mockAxiosAdapter.onPost(`${ApiRoute.Reviews}/${offerId}`, { comment: reviewData.comment, rating: reviewData.rating }).reply(201);
      mockAxiosAdapter.onGet(`${ApiRoute.Reviews}/${offerId}`).reply(200, []);

      await store.dispatch(postReview(reviewData));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const postReviewFulfilled = emittedActions.find(
        (action) => action.type === postReview.fulfilled.type
      ) as ReturnType<typeof postReview.fulfilled>;

      expect(extractedActionsTypes[0]).toBe(postReview.pending.type);
      expect(extractedActionsTypes).toContain(fetchReviews.pending.type);
      expect(extractedActionsTypes).toContain(postReview.fulfilled.type);

      expect(postReviewFulfilled.payload)
        .toEqual({ offerId });
    });

    it.each([400, 401, 404])('should dispatch "postReview.pending", "setError", "postReview.rejected", when server response %i', async (statusCode) => {
      mockAxiosAdapter.onPost(`${ApiRoute.Reviews}/${offerId}`, { comment: reviewData.comment, rating: reviewData.rating }).reply(statusCode);

      await store.dispatch(postReview(reviewData));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        postReview.pending.type,
        setError.type,
        postReview.rejected.type,
      ]);
    });
  });

  describe('authCheck action', () => {
    it('should dispatch "authCheck.pending", "fetchFavorites.pending", "authCheck.fulfilled" with thunk "authCheck"', async () => {
      const mockUser = getMockUser();
      mockAxiosAdapter.onGet(ApiRoute.Login).reply(200, mockUser);
      mockAxiosAdapter.onGet(ApiRoute.Favorites).reply(200, []);

      await store.dispatch(authCheck());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const authCheckFulfilled = emittedActions.find(
        (action) => action.type === authCheck.fulfilled.type
      ) as ReturnType<typeof authCheck.fulfilled>;

      expect(extractedActionsTypes[0]).toBe(authCheck.pending.type);
      expect(extractedActionsTypes).toContain(fetchFavorites.pending.type);
      expect(extractedActionsTypes).toContain(authCheck.fulfilled.type);

      expect(authCheckFulfilled.payload)
        .toEqual(mockUser);
    });

    it('should dispatch "authCheck.pending" and "authCheck.fulfilled" with null payload when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Login).reply(400);

      await store.dispatch(authCheck());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const authCheckFulfilled = emittedActions.find(
        (action) => action.type === authCheck.fulfilled.type
      ) as ReturnType<typeof authCheck.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        authCheck.pending.type,
        authCheck.fulfilled.type,
      ]);

      expect(authCheckFulfilled.payload)
        .toBeNull();
    });
  });

  describe('authLogin action', () => {
    const fakeAuthData = { email: 'test@test.ru', password: 'test1' };

    it('should dispatch "authLogin.pending", "fetchFavorites.pending", "redirectToRoute", "authLogin.fulfilled" when server response 200', async () => {
      const mockUser = getMockUser();
      mockAxiosAdapter.onPost(ApiRoute.Login, fakeAuthData).reply(200, mockUser);
      mockAxiosAdapter.onGet(ApiRoute.Favorites).reply(200, []);

      await store.dispatch(authLogin(fakeAuthData));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes[0]).toBe(authLogin.pending.type);
      expect(extractedActionsTypes).toContain(fetchFavorites.pending.type);
      expect(extractedActionsTypes).toContain(redirectToRoute.type);
      expect(extractedActionsTypes).toContain(authLogin.fulfilled.type);
    });

    it('should call "saveToken" once with the received token', async () => {
      const mockUser = getMockUser();
      mockAxiosAdapter.onPost(ApiRoute.Login, fakeAuthData).reply(200, mockUser);
      mockAxiosAdapter.onGet(ApiRoute.Favorites).reply(200, []);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(authLogin(fakeAuthData));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(mockUser.token);
    });

    it('should dispatch "authLogin.pending", "setError", "authLogin.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(ApiRoute.Login, fakeAuthData).reply(400);

      await store.dispatch(authLogin(fakeAuthData));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        authLogin.pending.type,
        setError.type,
        authLogin.rejected.type,
      ]);
    });
  });

  describe('authLogout action', () => {
    it('should dispatch "authLogout.pending", "redirectToRoute", "authLogout.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(204);

      await store.dispatch(authLogout());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        authLogout.pending.type,
        redirectToRoute.type,
        authLogout.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "authLogout"', async () => {
      mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(authLogout());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });
});



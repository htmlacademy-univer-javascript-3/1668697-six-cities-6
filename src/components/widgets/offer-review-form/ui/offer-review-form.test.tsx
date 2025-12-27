import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { withStore, getMockState, extractActionsTypes } from '../../../../mocks';
import { ApiRoute } from '../../../../shared';
import { postReview, fetchReviews } from '../../../../store/async-action';

import { OfferReviewForm } from './offer-review-form';

describe('Component: OfferReviewForm', () => {
  const mockOfferId = 'test-offer-id';
  const validComment = 'This is a very long comment that exceeds the minimum length requirement of 50 characters.';
  const validRating = 5;

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <OfferReviewForm offerId={mockOfferId} />,
      getMockState()
    );

    render(withStoreComponent);

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });

  it('should update comment value when user types', async () => {
    const { withStoreComponent } = withStore(
      <OfferReviewForm offerId={mockOfferId} />,
      getMockState()
    );

    render(withStoreComponent);

    const textarea = screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved');
    await userEvent.type(textarea, validComment);

    expect(textarea).toHaveValue(validComment);
  });

  it('should update rating when user selects a rating', async () => {
    const { withStoreComponent } = withStore(
      <OfferReviewForm offerId={mockOfferId} />,
      getMockState()
    );

    render(withStoreComponent);

    const ratingLabel = screen.getByTitle('perfect');
    await userEvent.click(ratingLabel);

    const ratingInput = screen.getByRole('radio', { checked: true });
    expect(ratingInput).toHaveAttribute('value', '5');
  });

  it('should enable submit button when form is valid', async () => {
    const { withStoreComponent } = withStore(
      <OfferReviewForm offerId={mockOfferId} />,
      getMockState()
    );

    render(withStoreComponent);

    const textarea = screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved');
    const ratingLabel = screen.getByTitle('perfect');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await userEvent.type(textarea, validComment);
    await userEvent.click(ratingLabel);

    expect(submitButton).not.toBeDisabled();
  });

  it('should dispatch postReview when form is submitted with valid data', async () => {
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      <OfferReviewForm offerId={mockOfferId} />,
      getMockState()
    );

    mockAxiosAdapter.onPost(`${ApiRoute.Reviews}/${mockOfferId}`, { comment: validComment, rating: validRating }).reply(201);
    mockAxiosAdapter.onGet(`${ApiRoute.Reviews}/${mockOfferId}`).reply(200, []);

    render(withStoreComponent);

    const textarea = screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved');
    const ratingLabel = screen.getByTitle('perfect');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await userEvent.type(textarea, validComment);
    await userEvent.click(ratingLabel);
    await userEvent.click(submitButton);

    await waitFor(() => {
      const actions = mockStore.getActions();
      const actionTypes = extractActionsTypes(actions);
      expect(actionTypes).toContain(postReview.pending.type);
      expect(actionTypes).toContain(fetchReviews.pending.type);
      expect(actionTypes).toContain(postReview.fulfilled.type);
    });
  });

  it('should not dispatch postReview when offerId is undefined', async () => {
    const { withStoreComponent, mockStore } = withStore(
      <OfferReviewForm offerId={undefined} />,
      getMockState()
    );

    render(withStoreComponent);

    const textarea = screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved');
    const ratingLabel = screen.getByTitle('perfect');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await userEvent.type(textarea, validComment);
    await userEvent.click(ratingLabel);
    await userEvent.click(submitButton);

    const actions = mockStore.getActions();
    expect(actions).toEqual([]);
  });
});


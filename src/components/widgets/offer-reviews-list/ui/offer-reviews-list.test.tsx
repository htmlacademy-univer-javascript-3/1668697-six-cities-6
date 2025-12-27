import { render, screen } from '@testing-library/react';

import { getMockReview } from '../../../../mocks';

import { OfferReviewsList } from './offer-reviews-list';

describe('Component: OfferReviewsList', () => {
  it('should render correctly', () => {
    const mockReviews = [getMockReview(), getMockReview()];
    const reviewsListTestId = 'reviews-list';
    const reviewItemTestId = 'review-item';

    render(<OfferReviewsList reviews={mockReviews} />);
    const reviewsList = screen.getByTestId(reviewsListTestId);
    const reviewItems = screen.getAllByTestId(reviewItemTestId);

    expect(reviewsList).toBeInTheDocument();
    expect(reviewItems.length).toBe(mockReviews.length);
  });

  it('should render maximum 10 reviews', () => {
    const mockReviews = Array.from({ length: 15 }, () => getMockReview());
    const expectedCount = 10;
    const reviewItemTestId = 'review-item';

    render(<OfferReviewsList reviews={mockReviews} />);
    const reviewItems = screen.getAllByTestId(reviewItemTestId);

    expect(reviewItems.length).toBe(expectedCount);
  });
});

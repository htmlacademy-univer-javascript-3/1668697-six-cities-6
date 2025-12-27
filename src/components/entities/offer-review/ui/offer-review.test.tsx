import { render, screen } from '@testing-library/react';

import { getMockReview } from '../../../../mocks';

import { OfferReview } from './offer-review';

describe('Component: OfferReview', () => {
  const mockReview = getMockReview();

  it('should render correctly', () => {
    const reviewItemTestId = 'review-item';
    const expectedUserName = mockReview.user.name;
    const expectedCommentText = mockReview.comment;

    render(<OfferReview reviewData={mockReview} />);
    const reviewItem = screen.getByTestId(reviewItemTestId);
    const reviewUserName = screen.getByText(expectedUserName);
    const reviewComment = screen.getByText(expectedCommentText);

    expect(reviewItem).toBeInTheDocument();
    expect(reviewUserName).toBeInTheDocument();
    expect(reviewComment).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { OfferReview } from './offer-review';
import { getMockReview } from '../../../../mocks';

describe('Component: OfferReview', () => {
  it('should render correctly', () => {
    const mockReview = getMockReview();
    const reviewItemTestId = 'review-item';
    const reviewAvatarTestId = 'review-avatar';
    const reviewUserNameTestId = 'review-user-name';
    const reviewCommentTestId = 'review-comment';
    const reviewRatingTestId = 'review-rating';
    const reviewDateTestId = 'review-date';

    render(<OfferReview reviewData={mockReview} />);
    const reviewItem = screen.getByTestId(reviewItemTestId);
    const reviewAvatar = screen.getByTestId(reviewAvatarTestId);
    const reviewUserName = screen.getByTestId(reviewUserNameTestId);
    const reviewComment = screen.getByTestId(reviewCommentTestId);
    const reviewRating = screen.getByTestId(reviewRatingTestId);
    const reviewDate = screen.getByTestId(reviewDateTestId);

    expect(reviewItem).toBeInTheDocument();
    expect(reviewAvatar).toBeInTheDocument();
    expect(reviewUserName).toBeInTheDocument();
    expect(reviewUserName).toHaveTextContent(mockReview.user.name);
    expect(reviewComment).toBeInTheDocument();
    expect(reviewComment).toHaveTextContent(mockReview.comment);
    expect(reviewRating).toBeInTheDocument();
    expect(reviewDate).toBeInTheDocument();
  });
});


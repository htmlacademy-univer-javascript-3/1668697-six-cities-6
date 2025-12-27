import { render, screen } from '@testing-library/react';

import { OfferGallery } from './offer-gallery';

describe('Component: OfferGallery', () => {
  it('should render correctly', () => {
    const mockImages = [
      'image1.jpg',
      'image2.jpg',
      'image3.jpg',
    ];
    const galleryTestId = 'gallery';
    const galleryImageTestId = 'gallery-image';

    render(<OfferGallery images={mockImages} />);
    const gallery = screen.getByTestId(galleryTestId);
    const galleryImages = screen.getAllByTestId(galleryImageTestId);

    expect(gallery).toBeInTheDocument();
    expect(galleryImages.length).toBe(mockImages.length);
  });

  it('should render maximum 6 images', () => {
    const mockImages = [
      'image1.jpg',
      'image2.jpg',
      'image3.jpg',
      'image4.jpg',
      'image5.jpg',
      'image6.jpg',
      'image7.jpg',
      'image8.jpg',
    ];
    const expectedCount = 6;
    const galleryImageTestId = 'gallery-image';

    render(<OfferGallery images={mockImages} />);
    const galleryImages = screen.getAllByTestId(galleryImageTestId);

    expect(galleryImages.length).toBe(expectedCount);
  });
});

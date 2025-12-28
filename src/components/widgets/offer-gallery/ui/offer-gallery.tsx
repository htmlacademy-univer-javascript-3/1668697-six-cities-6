import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { OfferGalleryProps } from '../model/types';

export const OfferGallery: React.FC<OfferGalleryProps> = ({ images }) => (
  <div className="offer__gallery-container container">
    <div className="offer__gallery" data-testid="gallery">
      {images.slice(0, 6).map((imageUrl) => (
        <div key={uuidv4()} className="offer__image-wrapper">
          <img className="offer__image" src={imageUrl} alt="Photo studio" data-testid="gallery-image" />
        </div>
      ))}
    </div>
  </div>
);

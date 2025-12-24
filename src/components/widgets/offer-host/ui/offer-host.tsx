import React from 'react';

import { OfferHostProps } from '../model/types';

export const OfferHost: React.FC<OfferHostProps> = ({ hostData, description }) => {
  const { name, avatarUrl, isPro } = hostData;

  return (
    (
      <div className="offer__host" data-testid="host">
        <h2 className="offer__host-title" data-testid="host-title">Meet the host</h2>
        <div className="offer__host-user user">
          <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
            <img className="offer__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" data-testid="host-avatar" />
          </div>

          <span className="offer__user-name" data-testid="host-name">
            {name}
          </span>

          {isPro && (
            <span className="offer__user-status" data-testid="host-pro-status">
            Pro
            </span>
          )}
        </div>

        <div className="offer__description">
          <p className="offer__text" data-testid="host-description">
            {description}
          </p>
        </div>
      </div>
    )
  );
};

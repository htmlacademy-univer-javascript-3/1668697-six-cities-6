import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../../shared';

import { getError, clearError } from '../../../../store/slices';

import './error-modal.css';

export const ErrorModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const error = useAppSelector(getError);

  if (!error) {
    return null;
  }

  const handleClose = () => {
    dispatch(clearError());
  };

  const handleOverlayClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (evt.target === evt.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className="error-modal-overlay" onClick={handleOverlayClick} data-testid="error-modal-overlay">
      <div className="error-modal" data-testid="error-modal">
        <h2 className="error-modal__title">Error</h2>

        <div className="error-modal__content">
          <p className="error-modal__message">{error}</p>
        </div>

        <div className="error-modal__footer">
          <button
            className="error-modal__button button"
            type="button"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


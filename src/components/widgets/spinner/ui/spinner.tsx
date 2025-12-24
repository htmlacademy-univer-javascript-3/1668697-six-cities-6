import React from 'react';

import './spinner.css';

export const Spinner: React.FC = () => (
  <div className="wrapper" data-testid="spinner-wrapper">
    <div className="spinner" data-testid="spinner" />
  </div>
);

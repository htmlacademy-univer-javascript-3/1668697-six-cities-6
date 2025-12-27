import { render, screen } from '@testing-library/react';

import { Spinner } from './spinner';

describe('Component: Spinner', () => {
  it('should render correctly', () => {
    const spinnerWrapperTestId = 'spinner-wrapper';
    const spinnerTestId = 'spinner';

    render(<Spinner />);
    const spinnerWrapper = screen.getByTestId(spinnerWrapperTestId);
    const spinner = screen.getByTestId(spinnerTestId);

    expect(spinnerWrapper).toBeInTheDocument();
    expect(spinner).toBeInTheDocument();
  });
});


import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import { withStore, withHistory, getMockState } from '../../../mocks';
import { AppRoute } from '../../../shared';

import { NotFoundPage } from './not-found-page';

describe('Component: NotFoundPage', () => {
  const mockHistory = createMemoryHistory();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <NotFoundPage />,
      getMockState()
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
    expect(screen.getByText('Nothing here yet...')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back To Home' })).toBeInTheDocument();
  });

  it('should navigate to main page when "Back To Home" link is clicked', async () => {
    const { withStoreComponent } = withStore(
      <NotFoundPage />,
      getMockState()
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    mockHistory.push('/unknown-route');
    render(preparedComponent);

    const backLink = screen.getByRole('link', { name: 'Back To Home' });
    await userEvent.click(backLink);

    expect(mockHistory.location.pathname).toBe(AppRoute.Main);
  });
});


import { MemoryHistory, createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { AppRoute } from '../../../../shared';

import { HistoryRouter } from './history-router';

describe('Component: HistoryRouter', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render children', () => {
    const expectedText = 'Test content';
    const component = (
      <HistoryRouter history={mockHistory}>
        <div>{expectedText}</div>
      </HistoryRouter>
    );

    render(component);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should work with routes', () => {
    const component = (
      <HistoryRouter history={mockHistory}>
        <Routes>
          <Route path={AppRoute.Main} element={<span>Main Page</span>} />
          <Route path={AppRoute.Login} element={<span>Login Page</span>} />
        </Routes>
      </HistoryRouter>
    );
    mockHistory.push(AppRoute.Main);

    render(component);

    expect(screen.getByText('Main Page')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });

  it('should render different route when history location changes', () => {
    mockHistory.push(AppRoute.Login);
    const component = (
      <HistoryRouter history={mockHistory}>
        <Routes>
          <Route path={AppRoute.Main} element={<span>Main Page</span>} />
          <Route path={AppRoute.Login} element={<span>Login Page</span>} />
        </Routes>
      </HistoryRouter>
    );

    render(component);

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Main Page')).not.toBeInTheDocument();
  });
});


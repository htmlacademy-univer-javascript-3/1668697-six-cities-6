import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { withStore, getMockState } from '../../../../mocks';
import { NameSpace } from '../../../../shared';

import { clearError } from '../../../../store/slices';

import { ErrorModal } from './error-modal';

describe('Component: ErrorModal', () => {
  const errorMessage = 'Test error message';

  it('should render correctly when error is present', () => {
    const expectedText = 'Error';
    const { withStoreComponent } = withStore(
      <ErrorModal />,
      getMockState({
        [NameSpace.ErrorData]: {
          error: errorMessage,
        },
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should not render modal if error is null', () => {
    const { withStoreComponent } = withStore(
      <ErrorModal />,
      getMockState({
        [NameSpace.ErrorData]: {
          error: null,
        },
      })
    );

    render(withStoreComponent);

    expect(screen.queryByTestId('error-modal-overlay')).not.toBeInTheDocument();
  });

  it('should dispatch clearError when close button is clicked', async () => {
    const { withStoreComponent, mockStore } = withStore(
      <ErrorModal />,
      getMockState({
        [NameSpace.ErrorData]: {
          error: errorMessage,
        },
      })
    );

    render(withStoreComponent);
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    const actions = mockStore.getActions();

    expect(actions).toEqual([
      { type: clearError.type }
    ]);
  });

  it('should dispatch clearError when clicking on overlay', async () => {
    const { withStoreComponent, mockStore } = withStore(
      <ErrorModal />,
      getMockState({
        [NameSpace.ErrorData]: {
          error: errorMessage,
        },
      })
    );

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId('error-modal-overlay'));
    const actions = mockStore.getActions();

    expect(actions).toEqual([
      { type: clearError.type }
    ]);
  });

  it('should not dispatch clearError when clicking inside modal (not on overlay)', async () => {
    const { withStoreComponent, mockStore } = withStore(
      <ErrorModal />,
      getMockState({
        [NameSpace.ErrorData]: {
          error: errorMessage,
        },
      })
    );

    render(withStoreComponent);

    await userEvent.click(screen.getByTestId('error-modal'));
    const actions = mockStore.getActions();

    expect(actions).toEqual([]);
  });
});

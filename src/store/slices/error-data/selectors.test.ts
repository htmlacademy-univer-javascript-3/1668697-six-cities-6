import { NameSpace } from '../../../shared';
import { getError } from './selectors';

describe('ErrorData selectors', () => {
  it('should return error from state when error exists', () => {
    const errorMessage = 'Something went wrong';
    const state = {
      [NameSpace.ErrorData]: {
        error: errorMessage,
      },
    };

    const result = getError(state);
    expect(result).toBe(errorMessage);
  });

  it('should return null from state when error is null', () => {
    const state = {
      [NameSpace.ErrorData]: {
        error: null,
      },
    };

    const result = getError(state);
    expect(result).toBeNull();
  });
});


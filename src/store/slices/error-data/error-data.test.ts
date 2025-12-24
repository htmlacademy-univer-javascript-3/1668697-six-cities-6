import { errorData } from './error-data';
import { authLogin, postReview } from '../../async-action';

describe('ErrorData slice', () => {
  const initialState = {
    error: null,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      error: null,
    };

    const result = errorData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      error: null,
    };

    const result = errorData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('"setError" should set error', () => {
    const errorMessage = 'Something went wrong';
    const expectedState = {
      error: errorMessage,
    };

    const result = errorData.reducer(
      initialState,
      errorData.actions.setError(errorMessage)
    );

    expect(result).toEqual(expectedState);
  });

  it('"clearError" should set error to null', () => {
    const stateWithError = {
      error: 'Some error',
    };
    const expectedState = {
      error: null,
    };

    const result = errorData.reducer(
      stateWithError,
      errorData.actions.clearError()
    );

    expect(result).toEqual(expectedState);
  });

  it('"authLogin.fulfilled" should set error to null', () => {
    const stateWithError = {
      error: 'Login error',
    };
    const expectedState = {
      error: null,
    };

    const result = errorData.reducer(stateWithError, authLogin.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('"postReview.fulfilled" should set error to null', () => {
    const stateWithError = {
      error: 'Review error',
    };
    const expectedState = {
      error: null,
    };

    const result = errorData.reducer(stateWithError, postReview.fulfilled);

    expect(result).toEqual(expectedState);
  });
});


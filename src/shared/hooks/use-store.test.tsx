import { ReactNode } from 'react';
import { renderHook } from '@testing-library/react';

import { withStore, getMockState } from '../../mocks';
import { NameSpace } from '../constants';
import { getError } from '../../store/slices';

import { useAppDispatch, useAppSelector } from './use-store';

describe('Hook: useStore', () => {
  describe('useAppDispatch', () => {
    it('should return dispatch function', () => {
      const wrapper = ({ children }: { children: ReactNode }) => {
        const { withStoreComponent } = withStore(
          children as JSX.Element,
          getMockState()
        );
        return withStoreComponent;
      };

      const { result } = renderHook(() => useAppDispatch(), { wrapper });

      expect(result.current).toBeInstanceOf(Function);
    });
  });

  describe('useAppSelector', () => {
    it('should return value from store', () => {
      const errorMessage = 'Test error';
      const wrapper = ({ children }: { children: ReactNode }) => {
        const { withStoreComponent } = withStore(
          children as JSX.Element,
          getMockState({
            [NameSpace.ErrorData]: {
              error: errorMessage,
            },
          })
        );
        return withStoreComponent;
      };

      const { result } = renderHook(() => useAppSelector(getError), { wrapper });

      expect(result.current).toBe(errorMessage);
    });

    it('should return null when value is null', () => {
      const wrapper = ({ children }: { children: ReactNode }) => {
        const { withStoreComponent } = withStore(
          children as JSX.Element,
          getMockState({
            [NameSpace.ErrorData]: {
              error: null,
            },
          })
        );
        return withStoreComponent;
      };

      const { result } = renderHook(() => useAppSelector(getError), { wrapper });

      expect(result.current).toBeNull();
    });
  });
});


import * as matchers from '@testing-library/jest-dom/matchers';
import { expect, vi } from 'vitest';

expect.extend(matchers);

Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

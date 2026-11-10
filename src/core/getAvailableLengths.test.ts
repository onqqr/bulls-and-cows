import { describe, expect, it } from 'vitest';

import { getAvailableLengths } from './getAvailableLengths.js';

describe('getAvailableLengths', () => {
  it('returns lengths from 2 to 6 that do not exceed the base', () => {
    expect(getAvailableLengths(10)).toEqual([2, 3, 4, 5, 6]);
    expect(getAvailableLengths(16)).toEqual([2, 3, 4, 5, 6]);
    expect(getAvailableLengths(8)).toEqual([2, 3, 4, 5, 6]);
  });

  it('returns only length 2 for binary base', () => {
    expect(getAvailableLengths(2)).toEqual([2]);
  });

  it('caps available lengths by the alphabet size', () => {
    expect(getAvailableLengths(4)).toEqual([2, 3, 4]);
    expect(getAvailableLengths(3)).toEqual([2, 3]);
  });
});

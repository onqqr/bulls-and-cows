import { describe, expect, it } from 'vitest';

import { countPossibleSecrets } from './countPossibleSecrets.js';

describe('countPossibleSecrets', () => {
  it('returns 1 when length is 0', () => {
    expect(countPossibleSecrets(0, 10)).toBe(1);
  });

  it('returns base when length is 1', () => {
    expect(countPossibleSecrets(1, 2)).toBe(2);
    expect(countPossibleSecrets(1, 10)).toBe(10);
    expect(countPossibleSecrets(1, 16)).toBe(16);
  });

  it('counts permutations without repetition P(base, length)', () => {
    expect(countPossibleSecrets(2, 2)).toBe(2);
    expect(countPossibleSecrets(2, 10)).toBe(90);
    expect(countPossibleSecrets(4, 10)).toBe(5040);
    expect(countPossibleSecrets(3, 16)).toBe(3360);
  });

  it('allows secrets that start with zero in the count', () => {
    expect(countPossibleSecrets(4, 10)).toBe(10 * 9 * 8 * 7);
  });

  it('returns 0 when length exceeds base', () => {
    expect(countPossibleSecrets(3, 2)).toBe(0);
    expect(countPossibleSecrets(5, 4)).toBe(0);
  });
});

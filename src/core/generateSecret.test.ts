import { describe, expect, it } from 'vitest';

import { generateSecret } from './generateSecret';
import { isValidGuess } from './isValidGuess';

const createSequenceRandom = (values: number[]) => {
  let index = 0;

  return () => {
    const value = values[index] ?? 0;
    index += 1;
    return value;
  };
};

describe('generateSecret', () => {
  it('returns a secret of the requested length', () => {
    const secret = generateSecret(4, 10, createSequenceRandom([0.1, 0.2, 0.3, 0.4]));

    expect(secret).toHaveLength(4);
  });

  it('returns only unique digits valid for the given base', () => {
    const secret = generateSecret(4, 10, createSequenceRandom([0.05, 0.15, 0.25, 0.35]));

    expect(isValidGuess(secret, 4, 10)).toBe(true);
  });

  it('can start with zero', () => {
    const secret = generateSecret(4, 10, createSequenceRandom([0, 0.2, 0.4, 0.6]));

    expect(secret[0]).toBe('0');
  });

  it('is deterministic when random source is injected', () => {
    const secret = generateSecret(4, 10, createSequenceRandom([0.1, 0.3, 0.5, 0.7]));

    expect(secret).toBe('1367');
  });

  it('works for hex base', () => {
    const secret = generateSecret(3, 16, createSequenceRandom([0.9, 0.5, 0.1]));

    expect(isValidGuess(secret, 3, 16)).toBe(true);
  });

  it('throws when length exceeds base', () => {
    expect(() => generateSecret(3, 2, createSequenceRandom([0.1, 0.2, 0.3]))).toThrow();
  });
});

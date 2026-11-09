import { describe, expect, it } from 'vitest';

import { isValidGuess } from './isValidGuess';

describe('isValidGuess', () => {
  it('accepts a guess with correct length, unique digits and valid alphabet', () => {
    expect(isValidGuess('0123', 4, 10)).toBe(true);
    expect(isValidGuess('ab', 2, 16)).toBe(true);
    expect(isValidGuess('01', 2, 2)).toBe(true);
  });

  it('rejects a guess with wrong length', () => {
    expect(isValidGuess('12', 4, 10)).toBe(false);
    expect(isValidGuess('12345', 4, 10)).toBe(false);
  });

  it('rejects a guess with repeated digits', () => {
    expect(isValidGuess('1123', 4, 10)).toBe(false);
    expect(isValidGuess('aa', 2, 16)).toBe(false);
  });

  it('rejects a guess with digits outside the base alphabet', () => {
    expect(isValidGuess('19', 2, 8)).toBe(false);
    expect(isValidGuess('2', 1, 2)).toBe(false);
    expect(isValidGuess('g1', 2, 16)).toBe(false);
  });

  it('treats hex letters case-insensitively', () => {
    expect(isValidGuess('AB', 2, 16)).toBe(true);
    expect(isValidGuess('aB', 2, 16)).toBe(true);
  });

  it('rejects empty guess', () => {
    expect(isValidGuess('', 2, 10)).toBe(false);
  });
});

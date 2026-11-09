import { describe, expect, it } from 'vitest';

import { evaluateGuess } from './evaluateGuess';

describe('evaluateGuess', () => {
  it('counts bulls for digits in the correct position', () => {
    expect(evaluateGuess('1234', '1234')).toEqual({ bulls: 4, cows: 0 });
    expect(evaluateGuess('1234', '1256')).toEqual({ bulls: 2, cows: 0 });
  });

  it('counts cows for digits present but in the wrong position', () => {
    expect(evaluateGuess('1234', '4321')).toEqual({ bulls: 0, cows: 4 });
    expect(evaluateGuess('1234', '2156')).toEqual({ bulls: 0, cows: 2 });
  });

  it('counts bulls and cows together', () => {
    expect(evaluateGuess('1234', '1243')).toEqual({ bulls: 2, cows: 2 });
    expect(evaluateGuess('1234', '1305')).toEqual({ bulls: 1, cows: 1 });
  });

  it('returns zeros when nothing matches', () => {
    expect(evaluateGuess('1234', '5678')).toEqual({ bulls: 0, cows: 0 });
  });

  it('compares hex digits case-insensitively', () => {
    expect(evaluateGuess('a1b2', 'A1B2')).toEqual({ bulls: 4, cows: 0 });
    expect(evaluateGuess('a1b2', '2BA1')).toEqual({ bulls: 0, cows: 4 });
  });
});

import { describe, expect, it } from 'vitest';

import { createGame, getElapsedMs, submitGuess } from './gameState';

const settings = { length: 4, base: 10 };

describe('createGame', () => {
  it('creates an initial playing state with empty history', () => {
    const state = createGame(settings, '0123', 1000);

    expect(state).toEqual({
      settings,
      secret: '0123',
      status: 'playing',
      history: [],
      startedAt: 1000,
      finishedAt: null,
    });
  });
});

describe('submitGuess', () => {
  it('appends an attempt immutably', () => {
    const state = createGame(settings, '0123', 1000);
    const next = submitGuess(state, '4567', 1500);

    expect(state.history).toHaveLength(0);
    expect(next.history).toEqual([{ guess: '4567', bulls: 0, cows: 0 }]);
    expect(next).not.toBe(state);
    expect(next.history).not.toBe(state.history);
  });

  it('marks the game as won when all digits are bulls', () => {
    const state = createGame(settings, '0123', 1000);
    const next = submitGuess(state, '0123', 2000);

    expect(next.status).toBe('won');
    expect(next.finishedAt).toBe(2000);
    expect(next.history).toHaveLength(1);
  });

  it('ignores invalid guesses', () => {
    const state = createGame(settings, '0123', 1000);

    expect(submitGuess(state, '1123', 1500)).toBe(state);
    expect(submitGuess(state, '12', 1500)).toBe(state);
  });

  it('ignores repeated guesses', () => {
    const state = submitGuess(createGame(settings, '0123', 1000), '4567', 1500);
    const next = submitGuess(state, '4567', 1600);

    expect(next).toBe(state);
    expect(next.history).toHaveLength(1);
  });

  it('normalizes hex case when storing history', () => {
    const hexState = createGame({ length: 2, base: 16 }, 'ab', 1000);
    const next = submitGuess(hexState, 'AB', 1500);

    expect(next.history[0]?.guess).toBe('ab');
    expect(next.status).toBe('won');
  });

  it('does nothing after the game is already won', () => {
    const won = submitGuess(createGame(settings, '0123', 1000), '0123', 2000);
    const next = submitGuess(won, '4567', 2500);

    expect(next).toBe(won);
  });
});

describe('getElapsedMs', () => {
  it('returns elapsed time from start to now while playing', () => {
    const state = createGame(settings, '0123', 1000);

    expect(getElapsedMs(state, 1300)).toBe(300);
  });

  it('freezes elapsed time at finishedAt after win', () => {
    const won = submitGuess(createGame(settings, '0123', 1000), '0123', 1800);

    expect(getElapsedMs(won, 5000)).toBe(800);
  });
});

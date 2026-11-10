import { evaluateGuess } from './evaluateGuess.js';
import { isValidGuess } from './isValidGuess.js';

export type GameSettings = {
  length: number;
  base: number;
};

export type Attempt = {
  guess: string;
  bulls: number;
  cows: number;
};

export type GameState = {
  settings: GameSettings;
  secret: string;
  status: 'playing' | 'won';
  history: readonly Attempt[];
  startedAt: number;
  finishedAt: number | null;
};

export const createGame = (settings: GameSettings, secret: string, now: number): GameState => ({
  settings,
  secret,
  status: 'playing',
  history: [],
  startedAt: now,
  finishedAt: null,
});

const hasGuess = (history: readonly Attempt[], guess: string): boolean =>
  history.some((attempt) => attempt.guess === guess);

export const submitGuess = (state: GameState, guess: string, now: number): GameState => {
  if (state.status !== 'playing') {
    return state;
  }

  const normalizedGuess = guess.toLowerCase();
  const { length, base } = state.settings;

  if (!isValidGuess(normalizedGuess, length, base) || hasGuess(state.history, normalizedGuess)) {
    return state;
  }

  const result = evaluateGuess(state.secret, normalizedGuess);
  const won = result.bulls === length;

  return {
    ...state,
    status: won ? 'won' : 'playing',
    history: [...state.history, { guess: normalizedGuess, ...result }],
    finishedAt: won ? now : null,
  };
};

export const getElapsedMs = (state: GameState, now: number): number =>
  (state.finishedAt ?? now) - state.startedAt;

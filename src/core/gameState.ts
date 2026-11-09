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

export const createGame = (_settings: GameSettings, _secret: string, _now: number): GameState => {
  throw new Error('Not implemented');
};

export const submitGuess = (_state: GameState, _guess: string, _now: number): GameState => {
  throw new Error('Not implemented');
};

export const getElapsedMs = (_state: GameState, _now: number): number => {
  throw new Error('Not implemented');
};

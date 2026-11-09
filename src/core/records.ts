export type ScoreRecord = {
  attempts: number;
  timeMs: number;
  length: number;
  base: number;
  createdAt: number;
};

export type ScoreStorage = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
};

export const SCORES_STORAGE_KEY = 'bulls-and-cows:scores';
export const DEFAULT_TOP_LIMIT = 10;

export const compareScores = (_left: ScoreRecord, _right: ScoreRecord): number => {
  throw new Error('Not implemented');
};

export const addScore = (
  _records: readonly ScoreRecord[],
  _record: ScoreRecord,
  _limit: number = DEFAULT_TOP_LIMIT,
): ScoreRecord[] => {
  throw new Error('Not implemented');
};

export const loadScores = (_storage: ScoreStorage): ScoreRecord[] => {
  throw new Error('Not implemented');
};

export const saveScores = (_storage: ScoreStorage, _records: readonly ScoreRecord[]): void => {
  throw new Error('Not implemented');
};

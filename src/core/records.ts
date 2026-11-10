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

export const compareScores = (left: ScoreRecord, right: ScoreRecord): number => {
  if (left.attempts !== right.attempts) {
    return left.attempts - right.attempts;
  }

  return left.timeMs - right.timeMs;
};

export const addScore = (
  records: readonly ScoreRecord[],
  record: ScoreRecord,
  limit: number = DEFAULT_TOP_LIMIT,
): ScoreRecord[] => {
  return [...records, record].sort(compareScores).slice(0, limit);
};

const isScoreRecord = (value: unknown): value is ScoreRecord => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.attempts === 'number' &&
    typeof candidate.timeMs === 'number' &&
    typeof candidate.length === 'number' &&
    typeof candidate.base === 'number' &&
    typeof candidate.createdAt === 'number'
  );
};

export const loadScores = (storage: ScoreStorage): ScoreRecord[] => {
  const raw = storage.getItem(SCORES_STORAGE_KEY);

  if (raw === null) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed) || !parsed.every(isScoreRecord)) {
      return [];
    }

    return [...parsed].sort(compareScores);
  } catch {
    return [];
  }
};

export const saveScores = (storage: ScoreStorage, records: readonly ScoreRecord[]): void => {
  storage.setItem(SCORES_STORAGE_KEY, JSON.stringify(records));
};

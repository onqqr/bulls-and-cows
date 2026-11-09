import { describe, expect, it } from 'vitest';

import {
  DEFAULT_TOP_LIMIT,
  SCORES_STORAGE_KEY,
  addScore,
  compareScores,
  loadScores,
  saveScores,
  type ScoreRecord,
  type ScoreStorage,
} from './records';

const score = (
  partial: Partial<ScoreRecord> & Pick<ScoreRecord, 'attempts' | 'timeMs'>,
): ScoreRecord => ({
  length: 4,
  base: 10,
  createdAt: 1,
  ...partial,
});

const createMemoryStorage = (initial: Record<string, string> = {}): ScoreStorage => {
  const data = { ...initial };

  return {
    getItem: (key) => data[key] ?? null,
    setItem: (key, value) => {
      data[key] = value;
    },
  };
};

describe('compareScores', () => {
  it('prefers fewer attempts', () => {
    expect(
      compareScores(score({ attempts: 3, timeMs: 9000 }), score({ attempts: 5, timeMs: 1000 })),
    ).toBeLessThan(0);
  });

  it('prefers less time when attempts are equal', () => {
    expect(
      compareScores(score({ attempts: 4, timeMs: 1000 }), score({ attempts: 4, timeMs: 2000 })),
    ).toBeLessThan(0);
  });
});

describe('addScore', () => {
  it('inserts a record and keeps ranking order', () => {
    const ranked = addScore(
      [score({ attempts: 5, timeMs: 3000, createdAt: 1 })],
      score({ attempts: 3, timeMs: 5000, createdAt: 2 }),
    );

    expect(ranked.map((item) => item.attempts)).toEqual([3, 5]);
  });

  it('keeps settings on each record for a shared leaderboard', () => {
    const ranked = addScore([], score({ attempts: 4, timeMs: 2000, length: 3, base: 16 }));

    expect(ranked[0]).toMatchObject({ length: 3, base: 16 });
  });

  it('trims the list to the top limit', () => {
    const seed = Array.from({ length: DEFAULT_TOP_LIMIT }, (_, index) =>
      score({ attempts: index + 2, timeMs: 1000, createdAt: index }),
    );

    const ranked = addScore(
      seed,
      score({ attempts: 1, timeMs: 1000, createdAt: 99 }),
      DEFAULT_TOP_LIMIT,
    );

    expect(ranked).toHaveLength(DEFAULT_TOP_LIMIT);
    expect(ranked[0]?.attempts).toBe(1);
    expect(ranked.at(-1)?.attempts).toBe(DEFAULT_TOP_LIMIT);
  });

  it('does not mutate the original array', () => {
    const original = [score({ attempts: 4, timeMs: 2000 })];
    const ranked = addScore(original, score({ attempts: 2, timeMs: 1000 }));

    expect(original).toHaveLength(1);
    expect(ranked).not.toBe(original);
  });
});

describe('loadScores and saveScores', () => {
  it('round-trips records through storage', () => {
    const storage = createMemoryStorage();
    const records = [score({ attempts: 3, timeMs: 1500, length: 2, base: 2 })];

    saveScores(storage, records);

    expect(loadScores(storage)).toEqual(records);
    expect(storage.getItem(SCORES_STORAGE_KEY)).toBe(JSON.stringify(records));
  });

  it('returns an empty list for missing or invalid storage data', () => {
    expect(loadScores(createMemoryStorage())).toEqual([]);
    expect(loadScores(createMemoryStorage({ [SCORES_STORAGE_KEY]: 'not-json' }))).toEqual([]);
    expect(loadScores(createMemoryStorage({ [SCORES_STORAGE_KEY]: '{"attempts":1}' }))).toEqual([]);
  });
});

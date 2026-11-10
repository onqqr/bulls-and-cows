import { getAvailableLengths } from '../core/getAvailableLengths.js';
import { type GameState } from '../core/gameState.js';
import { loadScores, type ScoreRecord, type ScoreStorage } from '../core/records.js';
import { type BaseId, baseById } from './constants.js';

export type AppModel = {
  baseId: BaseId;
  length: number;
  game: GameState | null;
  draft: string;
  scores: ScoreRecord[];
};

export const createInitialModel = (storage: ScoreStorage = localStorage): AppModel => {
  const baseId: BaseId = 'dec';
  const lengths = getAvailableLengths(baseById(baseId));

  return {
    baseId,
    length: lengths.includes(4) ? 4 : (lengths[0] ?? 2),
    game: null,
    draft: '',
    scores: loadScores(storage),
  };
};

export const syncLengthToBase = (baseId: BaseId, currentLength: number): number => {
  const lengths = getAvailableLengths(baseById(baseId));
  return lengths.includes(currentLength) ? currentLength : (lengths[0] ?? 2);
};

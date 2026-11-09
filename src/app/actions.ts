import { createDigitValidator } from '../core/createDigitValidator.js';
import { createGame, getElapsedMs, submitGuess } from '../core/gameState.js';
import { generateSecret } from '../core/generateSecret.js';
import { addScore, saveScores, type ScoreStorage } from '../core/records.js';
import { type BaseId, baseById } from './constants.js';
import { type AppModel, syncLengthToBase } from './model.js';

export const withBaseId = (model: AppModel, baseId: BaseId): AppModel => ({
  ...model,
  baseId,
  length: syncLengthToBase(baseId, model.length),
  draft: '',
});

export const withLength = (model: AppModel, length: number): AppModel => ({
  ...model,
  length,
  draft: '',
});

export const withDraft = (model: AppModel, draft: string): AppModel => ({
  ...model,
  draft: filterDraftInput(draft, model),
});

export const filterDraftInput = (value: string, model: AppModel): string => {
  const isDigit = createDigitValidator(baseById(model.baseId));

  return [...value]
    .map((char) => char.toLowerCase())
    .filter(isDigit)
    .filter((char, index, chars) => chars.indexOf(char) === index)
    .slice(0, model.length)
    .join('');
};

export const startGame = (
  model: AppModel,
  now: number = Date.now(),
  random: () => number = Math.random,
): AppModel => {
  const settings = { length: model.length, base: baseById(model.baseId) };
  const secret = generateSecret(settings.length, settings.base, random);

  return {
    ...model,
    draft: '',
    game: createGame(settings, secret, now),
  };
};

export const resetToSettings = (model: AppModel): AppModel => ({
  ...model,
  game: null,
  draft: '',
});

export const submitCurrentGuess = (
  model: AppModel,
  storage: ScoreStorage = localStorage,
  now: number = Date.now(),
): AppModel => {
  if (!model.game) {
    return model;
  }

  const nextGame = submitGuess(model.game, model.draft, now);

  if (nextGame === model.game) {
    return model;
  }

  if (nextGame.status !== 'won') {
    return {
      ...model,
      game: nextGame,
      draft: '',
    };
  }

  const scores = addScore(model.scores, {
    attempts: nextGame.history.length,
    timeMs: getElapsedMs(nextGame, now),
    length: nextGame.settings.length,
    base: nextGame.settings.base,
    createdAt: now,
  });

  saveScores(storage, scores);

  return {
    ...model,
    game: nextGame,
    draft: '',
    scores,
  };
};

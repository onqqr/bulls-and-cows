import { type ScoreRecord } from '../core/records.js';
import { idByBase } from '../app/constants.js';
import { formatDuration } from '../app/format.js';
import { el } from './dom.js';

export const renderScoresView = (scores: readonly ScoreRecord[]): HTMLElement =>
  el(
    'section',
    { className: 'panel' },
    el('h2', { text: 'High scores' }),
    scores.length === 0
      ? el('p', { className: 'empty', text: 'No records yet.' })
      : el(
          'ol',
          { className: 'scores' },
          ...scores.map((record, index) =>
            el(
              'li',
              {},
              el('span', { className: 'badge', text: `#${index + 1}` }),
              el('span', {
                text: `${record.attempts} attempts · ${formatDuration(record.timeMs)}`,
              }),
              el('span', {
                text: `${idByBase(record.base).toUpperCase()} / ${record.length}`,
              }),
            ),
          ),
        ),
  );

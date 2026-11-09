import { type ScoreRecord } from '../core/records';
import { idByBase } from '../app/constants';
import { formatDuration } from '../app/format';
import { el } from './dom';

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

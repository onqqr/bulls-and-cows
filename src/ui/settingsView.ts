import { countPossibleSecrets } from '../core/countPossibleSecrets.js';
import { getAvailableLengths } from '../core/getAvailableLengths.js';
import { BASE_OPTIONS, type BaseId, baseById } from '../app/constants.js';
import { type AppModel } from '../app/model.js';
import { el } from './dom.js';

type SettingsHandlers = {
  onBaseChange: (baseId: BaseId) => void;
  onLengthChange: (length: number) => void;
  onStart: () => void;
  onNewGame: () => void;
};

export const renderSettingsView = (
  model: AppModel,
  locked: boolean,
  handlers: SettingsHandlers,
): HTMLElement => {
  const base = baseById(model.baseId);
  const lengths = getAvailableLengths(base);

  return el(
    'section',
    { className: 'panel' },
    el('h2', { text: 'Settings' }),
    el(
      'div',
      { className: 'row' },
      el(
        'label',
        { className: 'field' },
        el('span', { text: 'Number system' }),
        el(
          'select',
          {
            disabled: locked,
            value: model.baseId,
            onChange: (event: Event) => {
              handlers.onBaseChange((event.target as HTMLSelectElement).value as BaseId);
            },
          },
          ...BASE_OPTIONS.map((option) => el('option', { value: option.id, text: option.label })),
        ),
      ),
      el(
        'label',
        { className: 'field' },
        el('span', { text: 'Secret length' }),
        el(
          'select',
          {
            disabled: locked,
            value: String(model.length),
            onChange: (event: Event) => {
              handlers.onLengthChange(Number((event.target as HTMLSelectElement).value));
            },
          },
          ...lengths.map((length) => el('option', { value: String(length), text: String(length) })),
        ),
      ),
    ),
    el('p', {
      className: 'meta',
      text: `Possible secrets: ${countPossibleSecrets(model.length, base)}`,
    }),
    el(
      'div',
      { className: 'actions row' },
      locked
        ? el('button', {
            className: 'secondary',
            type: 'button',
            text: 'New game',
            onClick: handlers.onNewGame,
          })
        : el('button', { type: 'button', text: 'Start game', onClick: handlers.onStart }),
    ),
  );
};

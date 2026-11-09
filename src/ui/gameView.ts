import { getElapsedMs, type GameState } from '../core/gameState';
import { formatDuration } from '../app/format';
import { el } from './dom';

type GameHandlers = {
  onDraftInput: (value: string) => void;
  onSubmit: () => void;
};

export const renderGameView = (
  game: GameState,
  draft: string,
  now: number,
  handlers: GameHandlers,
): HTMLElement => {
  const playing = game.status === 'playing';
  const elapsed = getElapsedMs(game, now);

  return el(
    'section',
    { className: 'panel' },
    el('h2', { text: 'Round' }),
    el('p', {
      className: `status${game.status === 'won' ? ' won' : ''}`,
      text:
        game.status === 'won'
          ? `Solved in ${game.history.length} attempts · ${formatDuration(elapsed)}`
          : `Attempts: ${game.history.length} · Time: ${formatDuration(elapsed)}`,
    }),
    playing
      ? el(
          'form',
          {
            className: 'guess-form',
            onSubmit: (event: Event) => {
              event.preventDefault();
              handlers.onSubmit();
            },
          },
          el('input', {
            value: draft,
            maxLength: game.settings.length,
            spellcheck: 'false',
            autocomplete: 'off',
            autocapitalize: 'off',
            placeholder: `Enter ${game.settings.length} unique digits`,
            onInput: (event: Event) => {
              handlers.onDraftInput((event.target as HTMLInputElement).value);
            },
          }),
          el('button', {
            type: 'submit',
            text: 'Check',
            disabled: draft.length !== game.settings.length,
          }),
        )
      : null,
    game.history.length === 0
      ? el('p', { className: 'empty', text: 'No attempts yet.' })
      : el(
          'ol',
          { className: 'history' },
          ...[...game.history]
            .reverse()
            .map((attempt, index) =>
              el(
                'li',
                {},
                el('span', { className: 'badge', text: `#${game.history.length - index}` }),
                el('span', { text: attempt.guess.toUpperCase() }),
                el('span', { text: `${attempt.bulls}B ${attempt.cows}C` }),
              ),
            ),
        ),
  );
};

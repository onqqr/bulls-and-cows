import {
  resetToSettings,
  startGame,
  submitCurrentGuess,
  withBaseId,
  withDraft,
  withLength,
} from './app/actions.js';
import { type BaseId } from './app/constants.js';
import { createInitialModel } from './app/model.js';
import { applyTheme, getPreferredTheme, toggleTheme, type Theme } from './app/theme.js';
import { el, mount } from './ui/dom.js';
import { renderGameView } from './ui/gameView.js';
import { createMoonIcon, createSunIcon } from './ui/icons.js';
import { renderScoresView } from './ui/scoresView.js';
import { renderSettingsView } from './ui/settingsView.js';

let model = createInitialModel();
let theme: Theme = getPreferredTheme();

applyTheme(theme);

const update = (nextModel: typeof model): void => {
  model = nextModel;
  render();
};

const switchTheme = (): void => {
  theme = toggleTheme(theme);
  applyTheme(theme);
  render();
};

const render = (): void => {
  const locked = model.game !== null;

  mount(
    document.body,
    el(
      'main',
      { className: 'app' },
      el(
        'div',
        { className: 'topbar' },
        el(
          'button',
          {
            className: 'theme-toggle',
            type: 'button',
            title: theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
            'aria-label': theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
            onClick: switchTheme,
          },
          theme === 'dark' ? createSunIcon() : createMoonIcon(),
        ),
      ),
      el(
        'header',
        { className: 'hero' },
        el('h1', { text: 'Bulls and Cows' }),
        el('p', {
          text: 'Guess the secret number of unique digits. Bulls are correct digits in the right place. Cows are correct digits in the wrong place.',
        }),
      ),
      renderSettingsView(model, locked, {
        onBaseChange: (baseId: BaseId) => update(withBaseId(model, baseId)),
        onLengthChange: (length: number) => update(withLength(model, length)),
        onStart: () => update(startGame(model)),
        onNewGame: () => update(resetToSettings(model)),
      }),
      model.game
        ? renderGameView(model.game, model.draft, Date.now(), {
            onDraftInput: (value: string) => update(withDraft(model, value)),
            onSubmit: () => update(submitCurrentGuess(model)),
          })
        : null,
      renderScoresView(model.scores),
    ),
  );

  const guessInput = document.querySelector('.guess-form input');

  if (guessInput instanceof HTMLInputElement) {
    guessInput.focus();
    guessInput.setSelectionRange(guessInput.value.length, guessInput.value.length);
  }
};

render();

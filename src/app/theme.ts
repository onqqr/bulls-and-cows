export type Theme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'bulls-and-cows:theme';

export const getPreferredTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const saved = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (saved === 'dark' || saved === 'light') {
    return saved;
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

export const applyTheme = (theme: Theme): void => {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
};

export const toggleTheme = (current: Theme): Theme => (current === 'dark' ? 'light' : 'dark');

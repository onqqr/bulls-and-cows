import { createDigitValidator } from './createDigitValidator';

export const isValidGuess = (guess: string, length: number, base: number): boolean => {
  if (guess.length !== length) {
    return false;
  }

  const isDigit = createDigitValidator(base);
  const normalized = [...guess].map((char) => char.toLowerCase());

  if (!normalized.every(isDigit)) {
    return false;
  }

  return new Set(normalized).size === normalized.length;
};

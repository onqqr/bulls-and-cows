const DIGITS = '0123456789abcdef';

export const createDigitValidator = (base: number) => {
  const alphabet = DIGITS.slice(0, base);

  return (char: string): boolean => {
    if (char.length !== 1) {
      return false;
    }

    return alphabet.includes(char.toLowerCase());
  };
};

export type GuessResult = {
  bulls: number;
  cows: number;
};

const normalize = (value: string): string[] => [...value].map((char) => char.toLowerCase());

export const evaluateGuess = (secret: string, guess: string): GuessResult => {
  const secretDigits = normalize(secret);
  const guessDigits = normalize(guess);

  const bulls = guessDigits.filter((digit, index) => digit === secretDigits[index]).length;

  const cows = guessDigits.filter(
    (digit, index) => digit !== secretDigits[index] && secretDigits.includes(digit),
  ).length;

  return { bulls, cows };
};

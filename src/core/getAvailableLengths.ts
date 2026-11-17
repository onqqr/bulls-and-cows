const MIN_LENGTH = 2;
const MAX_LENGTH = 6;

export const getAvailableLengths = (base: number): number[] => {
  return Array.from(
    { length: MAX_LENGTH - MIN_LENGTH + 1 },
    (_, index) => MIN_LENGTH + index,
  ).filter((length) => length <= base);
};

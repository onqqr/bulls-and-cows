const DIGITS = '0123456789abcdef';

export const generateSecret = (
  length: number,
  base: number,
  random: () => number = Math.random,
): string => {
  if (length > base) {
    throw new Error('Secret length cannot exceed base');
  }

  const pool = [...DIGITS.slice(0, base)];

  return Array.from({ length }, () => {
    const index = Math.floor(random() * pool.length);
    return pool.splice(index, 1)[0] ?? '';
  }).join('');
};

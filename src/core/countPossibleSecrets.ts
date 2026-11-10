const cache = new Map<string, number>();

const countPossibleSecretsRecursive = (length: number, base: number): number => {
  if (length === 0) {
    return 1;
  }

  if (length > base || length < 0 || base < 0) {
    return 0;
  }

  const key = `${length}:${base}`;
  const cached = cache.get(key);

  if (cached !== undefined) {
    return cached;
  }

  const result = base * countPossibleSecretsRecursive(length - 1, base - 1);
  cache.set(key, result);

  return result;
};

export const countPossibleSecrets = (length: number, base: number): number => {
  return countPossibleSecretsRecursive(length, base);
};

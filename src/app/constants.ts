export const BASE_OPTIONS = [
  { id: 'bin', label: 'Binary', base: 2 },
  { id: 'oct', label: 'Octal', base: 8 },
  { id: 'dec', label: 'Decimal', base: 10 },
  { id: 'hex', label: 'Hexadecimal', base: 16 },
] as const;

export type BaseId = (typeof BASE_OPTIONS)[number]['id'];

export const baseById = (baseId: BaseId): number =>
  BASE_OPTIONS.find((option) => option.id === baseId)?.base ?? 10;

export const idByBase = (base: number): BaseId =>
  BASE_OPTIONS.find((option) => option.base === base)?.id ?? 'dec';

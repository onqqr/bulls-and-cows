import { describe, expect, it } from 'vitest';

import { createDigitValidator } from './createDigitValidator.js';

describe('createDigitValidator', () => {
  it('returns a function', () => {
    const isDigit = createDigitValidator(10);

    expect(typeof isDigit).toBe('function');
  });

  it('accepts digits within the given base', () => {
    const isBinary = createDigitValidator(2);
    const isOctal = createDigitValidator(8);
    const isDecimal = createDigitValidator(10);
    const isHex = createDigitValidator(16);

    expect(isBinary('0')).toBe(true);
    expect(isBinary('1')).toBe(true);

    expect(isOctal('7')).toBe(true);
    expect(isDecimal('9')).toBe(true);
    expect(isHex('f')).toBe(true);
  });

  it('rejects digits outside the given base', () => {
    const isBinary = createDigitValidator(2);
    const isOctal = createDigitValidator(8);
    const isDecimal = createDigitValidator(10);

    expect(isBinary('2')).toBe(false);
    expect(isOctal('8')).toBe(false);
    expect(isDecimal('a')).toBe(false);
  });

  it('treats hex letters case-insensitively', () => {
    const isHex = createDigitValidator(16);

    expect(isHex('a')).toBe(true);
    expect(isHex('A')).toBe(true);
    expect(isHex('f')).toBe(true);
    expect(isHex('F')).toBe(true);
  });

  it('rejects empty string and multi-character input', () => {
    const isDecimal = createDigitValidator(10);

    expect(isDecimal('')).toBe(false);
    expect(isDecimal('12')).toBe(false);
  });
});

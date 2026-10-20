import { expect, test } from 'vitest';
import { toQuotedString } from './toQuotedString';

test('Should wrap a value in single quotes', () => {
  expect(toQuotedString({ value: 'Ada' })).toBe("'Ada'");
});

test('Should escape quotes and backslashes', () => {
  expect(toQuotedString({ value: "O'Brien" })).toBe("'O\\'Brien'");

  expect(toQuotedString({ value: 'a\\b' })).toBe("'a\\\\b'");
});

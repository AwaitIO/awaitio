import { expect, test } from 'vitest';
import { inputText } from './inputText';

const validate = (value: string, props = {}) => {
  return inputText.validate?.({ label: 'Name', props, value }) ?? null;
};

test('Should accept a non-empty text', () => {
  expect(validate('Petr')).toBeNull();
});

test('Should require a value that is not only whitespace', () => {
  expect(validate('   ')).toBe('Name is required.');
});

test('Should check the length limits', () => {
  expect(validate('ab', { minLength: 3 })).toBe('Name must be at least 3 characters long.');

  expect(validate('abcd', { maxLength: 3 })).toBe('Name must be at most 3 characters long.');
});

test('Should reject a value that is not text', () => {
  expect(inputText.returns.safeParse(42).success).toBe(false);
});

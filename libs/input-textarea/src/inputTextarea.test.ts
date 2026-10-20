import { expect, test } from 'vitest';
import { inputTextarea } from './inputTextarea';

const validate = (value: string, props = {}) => {
  return inputTextarea.validate?.({ label: 'Note', props: inputTextarea.props.parse(props), value }) ?? null;
};

test('Should accept text over several lines', () => {
  expect(validate('First line\nSecond line')).toBeNull();
});

test('Should require a value that is not only whitespace', () => {
  expect(validate('\n  \n')).toBe('Note is required.');
});

test('Should check the length limits', () => {
  expect(validate('ab', { minLength: 3 })).toBe('Note must be at least 3 characters long.');

  expect(validate('abcd', { maxLength: 3 })).toBe('Note must be at most 3 characters long.');
});

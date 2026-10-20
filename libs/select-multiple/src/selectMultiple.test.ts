import { expect, test } from 'vitest';
import { selectMultiple } from './selectMultiple';

const props = selectMultiple.props.parse({
  options: [
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
    { value: 'push', label: 'Push' },
  ],
  minSelections: 1,
  maxSelections: 2,
});
const validate = (value: string[]) => {
  return selectMultiple.validate?.({ label: 'Channels', props, value }) ?? null;
};

test('Should accept offered values within the limits', () => {
  expect(validate(['email'])).toBeNull();

  expect(validate(['email', 'push'])).toBeNull();
});

test('Should check the limits and refuse values that were not offered or twice', () => {
  expect(validate([])).toBe('Channels: choose at least 1.');

  expect(validate(['email', 'sms', 'push'])).toBe('Channels: choose at most 2.');

  expect(validate(['fax'])).toBe('Channels: choose from the options only.');

  expect(validate(['sms', 'sms'])).toBe('Channels: choose from the options only.');
});

test('Should refuse plain strings as options', () => {
  expect(selectMultiple.props.safeParse({ options: ['email'] }).success).toBe(false);
});

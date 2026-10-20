import { expect, test } from 'vitest';
import { selectSingle } from './selectSingle';

const props = selectSingle.props.parse({
  options: [
    { value: 'viewer', label: 'Viewer' },
    { value: 'admin', label: 'Administrator' },
  ],
});
const validate = (value: string) => {
  return selectSingle.validate?.({ label: 'Role', props, value }) ?? null;
};

test('Should accept one of the offered values', () => {
  expect(validate('admin')).toBeNull();

  expect(validate('viewer')).toBeNull();
});

test('Should refuse no choice and a value that was not offered', () => {
  expect(validate('')).toBe('Choose role.');

  expect(validate('owner')).toBe('Role: choose one of the options.');
});

test('Should refuse plain strings as options', () => {
  expect(selectSingle.props.safeParse({ options: ['viewer'] }).success).toBe(false);
});

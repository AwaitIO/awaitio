import { expect, test } from 'vitest';
import { confirm } from './confirm';

test('Should return a boolean and send the step itself', () => {
  expect(confirm.returns.safeParse(true).success).toBe(true);

  expect(confirm.returns.safeParse('yes').success).toBe(false);

  expect([confirm.wrap, confirm.submitButton]).toEqual([false, false]);
});

test('Should take an optional help text', () => {
  expect(confirm.props.parse({})).toEqual({});

  expect(confirm.props.parse({ helpText: 'All of their data is deleted.' })).toEqual({ helpText: 'All of their data is deleted.' });
});

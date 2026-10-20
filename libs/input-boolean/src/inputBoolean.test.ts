import { expect, test } from 'vitest';
import { inputBoolean } from './inputBoolean';

test('Should start unchecked unless a default is given', () => {
  expect(inputBoolean.initialValue?.(inputBoolean.props.parse({ helpText: 'Send it' }))).toBe(false);

  expect(inputBoolean.initialValue?.(inputBoolean.props.parse({ helpText: 'Send it', defaultValue: true }))).toBe(true);
});

test('Should accept only true or false as the answer', () => {
  expect([inputBoolean.returns.safeParse(true).success, inputBoolean.returns.safeParse(false).success]).toEqual([true, true]);

  expect(inputBoolean.returns.safeParse('yes').success).toBe(false);
});

test('Should require the help text shown beside the box', () => {
  expect(inputBoolean.props.safeParse({}).success).toBe(false);
});

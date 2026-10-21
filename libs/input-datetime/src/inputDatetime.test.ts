import { DateTime } from 'luxon';
import { expect, test } from 'vitest';
import { inputDatetime } from './inputDatetime';

const parse = (value: unknown) => {
  return inputDatetime.returns.safeParse(value);
};

test('Should turn the submitted ISO string into a DateTime in UTC', () => {
  const result = parse('2026-10-16T14:30:00.000Z');

  expect(result.success && result.data.toISO()).toBe('2026-10-16T14:30:00.000Z');
});

test('Should ask for a value when the field is empty', () => {
  const result = parse('');

  expect(result.success === false && result.error.issues[0]?.message).toBe('pick a date and time');
});

test('Should accept a DateTime or a Date as a prop', () => {
  expect(inputDatetime.props.parse({ defaultValue: DateTime.fromISO('2026-10-16T16:30:00+02:00'), min: new Date('2026-10-01T00:00:00.000Z') })).toEqual({
    defaultValue: '2026-10-16T14:30:00.000Z',
    min: '2026-10-01T00:00:00.000Z',
  });
});

test('Should check min and max', () => {
  const props = { min: '2026-10-01T00:00:00.000Z', max: '2026-10-31T00:00:00.000Z' };

  expect(inputDatetime.validate?.({ label: 'When', props, value: DateTime.fromISO('2026-09-30T23:00:00.000Z') })).toBe('When must not be earlier than 2026-10-01 00:00 UTC.');

  expect(inputDatetime.validate?.({ label: 'When', props, value: DateTime.fromISO('2026-11-01T00:00:00.000Z') })).toBe('When must not be later than 2026-10-31 00:00 UTC.');

  expect(inputDatetime.validate?.({ label: 'When', props, value: DateTime.fromISO('2026-10-16T12:00:00.000Z') })).toBeNull();
});

test('Should accept the minute of min, because the input has no seconds', () => {
  expect(inputDatetime.validate?.({ label: 'When', props: { min: '2026-10-16T08:00:30.500Z' }, value: DateTime.fromISO('2026-10-16T08:00:00.000Z') })).toBeNull();

  expect(inputDatetime.validate?.({ label: 'When', props: { min: '2026-10-16T08:00:30.500Z' }, value: DateTime.fromISO('2026-10-16T07:59:00.000Z') })).toBe(
    'When must not be earlier than 2026-10-16 08:00 UTC.',
  );
});

test('Should refuse a date that does not exist', () => {
  const result = parse('2026-02-30T10:00:00.000Z');

  expect(result.success === false && result.error.issues[0]?.message).toBe('pick a date and time');

  expect(inputDatetime.props.safeParse({ min: '2026-02-30T10:00:00.000Z' }).success).toBe(false);
});

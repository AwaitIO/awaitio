import { DateTime } from 'luxon';
import { expect, test } from 'vitest';
import { inputDate } from './inputDate';

const parse = (value: unknown) => {
  return inputDate.returns.safeParse(value);
};

test('Should turn the submitted date into a DateTime at the start of the day in UTC', () => {
  const result = parse('2026-11-02');

  expect(result.success && result.data.toISO()).toBe('2026-11-02T00:00:00.000Z');
});

test('Should ask for a date when the field is empty or the value is no date', () => {
  const empty = parse('');

  expect(empty.success === false && empty.error.issues[0]?.message).toBe('pick a date');

  const invalid = parse('next tuesday');

  expect(invalid.success === false && invalid.error.issues[0]?.message).toBe('pick a date');
});

test('Should refuse a date that does not exist', () => {
  const result = parse('2026-02-30');

  expect(result.success === false && result.error.issues[0]?.message).toBe('pick a date that exists');

  expect(inputDate.props.safeParse({ min: '2026-02-30' }).success).toBe(false);
});

test('Should turn a DateTime, a Date or a string prop into YYYY-MM-DD', () => {
  expect(inputDate.props.parse({ defaultValue: DateTime.fromISO('2026-10-16T23:30:00+02:00', { setZone: true }), min: new Date('2026-10-01T00:00:00.000Z'), max: '2026-10-31' })).toEqual({
    defaultValue: '2026-10-16',
    min: '2026-10-01',
    max: '2026-10-31',
  });
});

test('Should check min and max, including the days themselves', () => {
  const props = { min: '2026-10-01', max: '2026-10-31' };

  expect(inputDate.validate?.({ label: 'Due', props, value: DateTime.fromISO('2026-09-30', { zone: 'utc' }) })).toBe('Due must not be earlier than 2026-10-01.');

  expect(inputDate.validate?.({ label: 'Due', props, value: DateTime.fromISO('2026-11-01', { zone: 'utc' }) })).toBe('Due must not be later than 2026-10-31.');

  expect(inputDate.validate?.({ label: 'Due', props, value: DateTime.fromISO('2026-10-01', { zone: 'utc' }) })).toBeNull();

  expect(inputDate.validate?.({ label: 'Due', props, value: DateTime.fromISO('2026-10-31', { zone: 'utc' }) })).toBeNull();
});

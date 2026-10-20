import { expect, test, vi } from 'vitest';
import { selectMultiple } from './selectMultiple';

const channels = [
  { value: 'email', label: 'Email' },
  { value: 'sms', label: 'SMS' },
  { value: 'push', label: 'Push' },
];
const users = [
  { id: 1, email: 'ada@example.com' },
  { id: 2, email: 'bo@example.com' },
  { id: 3, email: 'cy@example.com' },
];
const userNaming = {
  key: (user: (typeof users)[number]) => {
    return user.id;
  },
  label: (user: (typeof users)[number]) => {
    return user.email;
  },
};
const validate = (value: string[]) => {
  return selectMultiple.validate?.({ label: 'Channels', props: selectMultiple.props.parse({ options: channels, minSelections: 1, maxSelections: 2 }), value }) ?? null;
};

test('Should accept offered indexes within the limits', () => {
  expect(validate(['0'])).toBeNull();

  expect(validate(['0', '2'])).toBeNull();
});

test('Should check the limits and refuse indexes that were not offered or twice', () => {
  expect(validate([])).toBe('Channels: choose at least 1.');

  expect(validate(['0', '1', '2'])).toBe('Channels: choose at most 2.');

  expect(validate(['3'])).toBe('Channels: choose from the options only.');

  expect(validate(['sms'])).toBe('Channels: choose from the options only.');

  expect(validate(['1', '1'])).toBe('Channels: choose from the options only.');
});

test('Should give the handler the original options in the order of the options', () => {
  expect(selectMultiple.toValue?.({ props: { options: channels }, value: ['2', '0'] })).toEqual([channels[0], channels[2]]);

  expect((selectMultiple.toValue?.({ props: { options: users, ...userNaming }, value: ['1'] }) as typeof users)[0]).toBe(users[1]);

  expect(selectMultiple.toValue?.({ props: { options: ['DRAFT', 'DELETED', 'EXPIRED'] }, value: ['2', '1'] })).toEqual(['DELETED', 'EXPIRED']);
});

test('Should start with the options the defaults name by their keys or as the options themselves', () => {
  expect(selectMultiple.initialValue?.(selectMultiple.props.parse({ options: channels, defaultValue: ['push', 'email'] }))).toEqual(['0', '2']);

  expect(selectMultiple.initialValue?.(selectMultiple.props.parse({ options: users, ...userNaming, defaultValue: [3, users[0]] }))).toEqual(['0', '2']);

  expect(selectMultiple.initialValue?.(selectMultiple.props.parse({ options: channels }))).toEqual([]);
});

test('Should leave out and warn about defaults that are not among the options', () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

  expect(selectMultiple.initialValue?.(selectMultiple.props.parse({ options: channels, defaultValue: ['sms', 'fax'] }))).toEqual(['1']);

  expect(warn).toHaveBeenCalledOnce();

  warn.mockRestore();
});

test('Should refuse records without key and label, and two options with the same key', () => {
  expect(selectMultiple.props.safeParse({ options: users }).success).toBe(false);

  expect(selectMultiple.props.safeParse({ options: ['email', 'email'] }).success).toBe(false);
});

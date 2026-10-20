import { expect, test, vi } from 'vitest';
import { selectSingle } from './selectSingle';

const roles = [
  { value: 'viewer', label: 'Viewer' },
  { value: 'admin', label: 'Administrator' },
];
const accounts = [
  { id: 'a1', name: 'Acme', createdAt: new Date('2026-01-12T09:30:00.000Z') },
  { id: 'a2', name: 'Globex', createdAt: new Date('2026-03-04T14:05:00.000Z') },
];
const accountNaming = {
  key: (account: (typeof accounts)[number]) => {
    return account.id;
  },
  label: (account: (typeof accounts)[number]) => {
    return account.name;
  },
};
const validate = (value: string) => {
  return selectSingle.validate?.({ label: 'Role', props: selectSingle.props.parse({ options: roles }), value }) ?? null;
};

test('Should accept the index of an offered option', () => {
  expect(validate('1')).toBeNull();

  expect(validate('0')).toBeNull();
});

test('Should refuse no choice and an index that was not offered', () => {
  expect(validate('')).toBe('Choose role.');

  expect(validate('2')).toBe('Role: choose one of the options.');

  expect(validate('admin')).toBe('Role: choose one of the options.');
});

test('Should send only the labels to the browser, with the index as the value', () => {
  expect(selectSingle.props.parse({ options: accounts, ...accountNaming }).choices).toEqual([
    { value: '0', label: 'Acme' },
    { value: '1', label: 'Globex' },
  ]);

  expect(selectSingle.props.parse({ options: ['DRAFT', 'EXPIRED'] }).choices).toEqual([
    { value: '0', label: 'DRAFT' },
    { value: '1', label: 'EXPIRED' },
  ]);
});

test('Should give the handler the original option, Dates included', () => {
  expect(selectSingle.toValue?.({ props: { options: roles }, value: '1' })).toBe(roles[1]);

  expect(selectSingle.toValue?.({ props: { options: accounts, ...accountNaming }, value: '0' })).toBe(accounts[0]);

  expect(selectSingle.toValue?.({ props: { options: [true, false, null] }, value: '1' })).toBe(false);
});

test('Should start with the option the default names by its key or as the option itself', () => {
  expect(selectSingle.initialValue?.(selectSingle.props.parse({ options: roles, defaultValue: 'admin' }))).toBe('1');

  expect(selectSingle.initialValue?.(selectSingle.props.parse({ options: roles, defaultValue: { value: 'admin', label: 'Administrator' } }))).toBe('1');

  expect(selectSingle.initialValue?.(selectSingle.props.parse({ options: accounts, ...accountNaming, defaultValue: 'a2' }))).toBe('1');

  expect(selectSingle.initialValue?.(selectSingle.props.parse({ options: accounts, ...accountNaming, defaultValue: { ...accounts[0] } }))).toBe('0');

  expect(selectSingle.initialValue?.(selectSingle.props.parse({ options: [1, 2], defaultValue: '2' }))).toBe('1');
});

test('Should start empty and warn when the default is not among the options', () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

  expect(selectSingle.initialValue?.(selectSingle.props.parse({ options: roles, defaultValue: 'owner' }))).toBe('');

  expect(warn).toHaveBeenCalledOnce();

  warn.mockRestore();
});

test('Should refuse records without key and label, and two options with the same key', () => {
  expect(selectSingle.props.safeParse({ options: accounts }).success).toBe(false);

  expect(selectSingle.props.safeParse({ options: ['DRAFT', 'DRAFT'] }).success).toBe(false);

  expect(selectSingle.props.safeParse({ options: roles, key: 'value' }).success).toBe(false);
});

test('Should take no options at all', () => {
  expect(selectSingle.props.parse({ options: [] }).choices).toEqual([]);
});

import { expect, test } from 'vitest';
import { selectTable } from './selectTable';

const data = [
  { id: 1, name: 'Ada', createdAt: new Date('2026-01-12T09:30:00.000Z') },
  { id: 2, name: 'Bo', createdAt: new Date('2026-03-04T14:05:00.000Z') },
  { id: 3, name: 'Cy', createdAt: new Date('2026-06-21T08:45:00.000Z') },
];
const columns = ['name', { label: 'Created', accessorKey: 'createdAt' }];
const parse = (props = {}) => {
  return selectTable.props.parse({ data, columns, ...props });
};
const validate = (value: number[], props = {}) => {
  return selectTable.validate?.({ label: 'Users', props: parse(props), value }) ?? null;
};

test('Should accept exactly one row by default', () => {
  expect(validate([1])).toBeNull();

  expect(validate([])).toBe('Users: pick a row.');

  expect(validate([0, 1])).toBe('Users: pick at most 1 row.');
});

test('Should check custom limits and refuse a row that is not in the table', () => {
  expect(validate([0, 2], { minSelections: 2, maxSelections: 3 })).toBeNull();

  expect(validate([0], { minSelections: 2, maxSelections: 3 })).toBe('Users: pick at least 2 rows.');

  expect(validate([9])).toBe('Users: pick rows from the table only.');

  expect(validate([1, 1], { maxSelections: 3 })).toBe('Users: pick rows from the table only.');
});

test('Should give the handler the original records, Dates included', () => {
  expect(selectTable.toValue?.({ props: { data, columns }, value: [2, 0] })).toEqual([data[2], data[0]]);

  expect((selectTable.toValue?.({ props: { data, columns }, value: [0] }) as typeof data)[0]?.createdAt).toBeInstanceOf(Date);
});

test('Should start with the default rows picked, the same objects or copies with the same values', () => {
  expect(selectTable.initialValue?.(parse({ defaultValue: [data[2], data[0]] }))).toEqual([2, 0]);

  expect(selectTable.initialValue?.(parse({ defaultValue: [{ ...data[1] }] }))).toEqual([1]);

  expect(selectTable.initialValue?.(parse())).toEqual([]);
});

test('Should keep the records of data as they are, not copies', () => {
  expect(selectTable.props.parse({ data, columns }).rows).toHaveLength(3);

  expect(selectTable.toValue?.({ props: { data, columns }, value: [1] })).toEqual([data[1]]);

  expect((selectTable.toValue?.({ props: { data, columns }, value: [1] }) as typeof data)[0]).toBe(data[1]);
});

test('Should take an empty table and let it be answered with no row', () => {
  expect(validate([], { data: [] })).toBeNull();

  expect(validate([0], { data: [data[0]], minSelections: 2, maxSelections: 3 })).toBeNull();
});

test('Should require the columns', () => {
  expect(selectTable.props.safeParse({ data }).success).toBe(false);
});

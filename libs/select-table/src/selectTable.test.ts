import { expect, test } from 'vitest';
import { selectTable } from './selectTable';

const rows = [
  { id: 1, name: 'Ada' },
  { id: 2, name: 'Bo' },
  { id: 3, name: 'Cy' },
];
const columns = ['id', 'name'];
const validate = (value: Record<string, unknown>[], props = {}) => {
  return selectTable.validate?.({ label: 'Users', props: selectTable.props.parse({ rows, columns, ...props }), value }) ?? null;
};

test('Should accept exactly one offered row by default', () => {
  expect(validate([{ id: 2, name: 'Bo' }])).toBeNull();

  expect(validate([])).toBe('Users: pick a row.');

  expect(validate([rows[0], rows[1]])).toBe('Users: pick at most 1 row.');
});

test('Should check custom limits and refuse a row that was not offered', () => {
  expect(validate([rows[0], rows[2]], { minSelections: 2, maxSelections: 3 })).toBeNull();

  expect(validate([rows[0]], { minSelections: 2, maxSelections: 3 })).toBe('Users: pick at least 2 rows.');

  expect(validate([{ id: 9, name: 'Mallory' }])).toBe('Users: pick rows from the table only.');
});

test('Should start with the default rows picked', () => {
  expect(selectTable.initialValue?.(selectTable.props.parse({ rows, columns, defaultValue: [rows[1]] }))).toEqual([{ id: 2, name: 'Bo' }]);

  expect(selectTable.initialValue?.(selectTable.props.parse({ rows, columns }))).toEqual([]);
});

test('Should take an empty table and let it be answered with no row', () => {
  expect(validate([], { rows: [] })).toBeNull();

  expect(validate([rows[0]], { rows: [rows[0]], minSelections: 2, maxSelections: 3 })).toBeNull();
});

test('Should require the columns', () => {
  expect(selectTable.props.safeParse({ rows }).success).toBe(false);
});

import { expect, test } from 'vitest';
import { selectTable } from './selectTable';

const rows = [
  { id: 1, name: 'Ada' },
  { id: 2, name: 'Bo' },
  { id: 3, name: 'Cy' },
];
const validate = (value: Record<string, unknown>[], limits = {}) => {
  return selectTable.validate?.({ label: 'Users', props: selectTable.props.parse({ rows, ...limits }), value }) ?? null;
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

import { expect, test } from 'vitest';
import { displayTable } from './displayTable';

test('Should accept rows of any values, plain and linked columns and a row menu', () => {
  const parsed = displayTable.props.safeParse({
    rows: [{ id: 1, name: 'Ada', createdAt: new Date(0), admin: true }],
    columns: ['id', { key: 'name', label: 'Name', route: { action: 'accounts/detail', params: { id: '{id}' } } }],
    rowMenu: [{ label: 'Edit', action: 'accounts/update_account', params: { id: '{id}' } }],
  });

  expect(parsed.success).toBe(true);

  expect(parsed.success && [parsed.data.pageSize, parsed.data.filterable]).toEqual([20, true]);
});

test('Should refuse a page that passes no rows or a menu item without an action', () => {
  expect(displayTable.props.safeParse({ pageSize: 10 }).success).toBe(false);

  expect(displayTable.props.safeParse({ rows: [], rowMenu: [{ label: 'Edit' }] }).success).toBe(false);
});

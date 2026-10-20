import { expect, test } from 'vitest';
import { displayTable } from './displayTable';
import type { z } from 'zod';

test('Should accept rows of any values, plain and linked columns and a row menu', () => {
  const parsed = displayTable.props.safeParse({
    rows: [{ id: 1, name: 'Ada', createdAt: new Date(0), admin: true }],
    columns: ['id', { key: 'name', label: 'Name', route: { action: 'accounts/detail', params: { id: '{id}' } } }],
    rowMenu: [{ label: 'Edit', action: 'accounts/update_account', params: { id: '{id}' } }],
  });

  expect(parsed.success).toBe(true);

  expect(parsed.success && [parsed.data.pageSize, parsed.data.filterable]).toEqual([20, true]);
});

test('Should build each row its own menu from a function and send no function on', () => {
  // Typed like the props of io.display.table, so `row` gets its type from the schema.
  const props: z.input<typeof displayTable.props> = {
    rows: [
      { id: 1, isActive: true },
      { id: 2, isActive: false },
    ],
    rowMenu: (row) => {
      return row.isActive
        ? [{ label: 'Unfreeze', action: 'module/unfreeze_module', params: { id: '7' } }]
        : [{ label: 'Freeze to this version', action: 'module/freeze_to_version', params: { id: '7', versionId: String(row.id) } }];
    },
  };
  const parsed = displayTable.props.safeParse(props);

  expect(parsed.success && parsed.data.rowMenus).toEqual([
    [{ label: 'Unfreeze', action: 'module/unfreeze_module', params: { id: '7' } }],
    [{ label: 'Freeze to this version', action: 'module/freeze_to_version', params: { id: '7', versionId: '2' } }],
  ]);

  expect(parsed.success && parsed.data.rowMenu).toBeUndefined();
});

test('Should leave a row without a menu when the function returns an empty array', () => {
  const parsed = displayTable.props.safeParse({
    rows: [
      { slug: 'eu', hasTable: true },
      { slug: 'us', hasTable: false },
    ],
    rowMenu: (row: Record<string, unknown>) => {
      return row.hasTable ? [] : [{ label: 'Create table', action: 'proof_of_play/create_table', params: { slug: String(row.slug) } }];
    },
  });

  expect(parsed.success && parsed.data.rowMenus).toEqual([[], [{ label: 'Create table', action: 'proof_of_play/create_table', params: { slug: 'us' } }]]);
});

test('Should keep the shared menu with its templates as it was', () => {
  const parsed = displayTable.props.safeParse({ rows: [{ id: 1 }], rowMenu: [{ label: 'Edit', action: 'accounts/update_account', params: { id: '{id}' } }] });

  expect(parsed.success && [parsed.data.rowMenu, parsed.data.rowMenus]).toEqual([[{ label: 'Edit', action: 'accounts/update_account', params: { id: '{id}' } }], undefined]);
});

test('Should turn a function that throws or returns a bad link into a props error', () => {
  const throwing = displayTable.props.safeParse({
    rows: [{ id: 1 }],
    rowMenu: () => {
      throw new Error('Module not found');
    },
  });

  expect(throwing.success ? null : throwing.error.issues[0]?.message).toBe('row 1: Module not found');

  const badLink = displayTable.props.safeParse({
    rows: [{ id: 1 }],
    rowMenu: () => {
      return [{ label: 'Edit' }];
    },
  });

  expect(badLink.success).toBe(false);
});

test('Should refuse a page that passes no rows or a menu item without an action', () => {
  expect(displayTable.props.safeParse({ pageSize: 10 }).success).toBe(false);

  expect(displayTable.props.safeParse({ rows: [], rowMenu: [{ label: 'Edit' }] }).success).toBe(false);
});

import { expect, test } from 'vitest';
import { displayTable } from './displayTable';

const data = [
  { id: 1, name: 'Ada', isActive: true, account: { name: 'Acme' } },
  { id: 2, name: 'Bo', isActive: false, account: { name: 'Globex' } },
];

test('Should send only the cells, from accessorKey or renderCell, and default the options', () => {
  const parsed = displayTable.props.safeParse({
    data,
    columns: ['id', { label: 'Name', accessorKey: 'name' }, { label: 'Account', renderCell: (row: (typeof data)[number]) => row.account.name }],
  });

  expect(parsed.success && parsed.data.columns).toEqual([
    { key: '0', label: 'id' },
    { key: '1', label: 'Name' },
    { key: '2', label: 'Account' },
  ]);

  expect(parsed.success && parsed.data.rows).toEqual([
    { cells: [1, 'Ada', 'Acme'], menu: [] },
    { cells: [2, 'Bo', 'Globex'], menu: [] },
  ]);

  expect(parsed.success && [parsed.data.pageSize, parsed.data.filterable]).toEqual([20, true]);
});

test('Should keep cell objects with a color, an outside link or an action route', () => {
  const parsed = displayTable.props.safeParse({
    data,
    columns: [
      {
        label: 'Status',
        renderCell: (row: (typeof data)[number]) => {
          return { label: row.isActive ? 'Active' : 'Frozen', highlightColor: row.isActive ? 'green' : 'gray', route: { action: 'users/detail', params: { id: String(row.id) } } };
        },
      },
      { label: 'Docs', renderCell: () => ({ label: 'Docs', url: 'https://docs.awaitio.com' }) },
    ],
  });

  expect(parsed.success && parsed.data.rows[0]?.cells).toEqual([
    { label: 'Active', highlightColor: 'green', route: { action: 'users/detail', params: { id: '1' } } },
    { label: 'Docs', url: 'https://docs.awaitio.com' },
  ]);
});

test('Should build each row its own menu, [] for none', () => {
  const parsed = displayTable.props.safeParse({
    data,
    columns: ['name'],
    rowMenuItems: (row: (typeof data)[number]) => {
      return row.isActive ? [{ label: 'Freeze', action: 'users/freeze', params: { id: String(row.id) } }] : [];
    },
  });

  expect(
    parsed.success &&
      parsed.data.rows.map((row) => {
        return row.menu;
      }),
  ).toEqual([[{ label: 'Freeze', action: 'users/freeze', params: { id: '1' } }], []]);
});

test('Should turn a function that throws, a bad cell or a bad menu item into a props error', () => {
  const throwing = displayTable.props.safeParse({
    data,
    columns: [
      {
        label: 'Account',
        renderCell: () => {
          throw new Error('Account not found');
        },
      },
    ],
  });

  expect(throwing.success ? null : throwing.error.issues[0]?.message).toBe('row 1, Account: Account not found');

  expect(displayTable.props.safeParse({ data, columns: [{ label: 'Status', renderCell: () => ({ label: 'Active', highlightColor: 'lime' }) }] }).success).toBe(false);

  expect(displayTable.props.safeParse({ data, columns: ['name'], rowMenuItems: () => [{ label: 'Edit' }] }).success).toBe(false);
});

test('Should take an empty table but require the columns, each with a key or a renderCell', () => {
  expect(displayTable.props.safeParse({ data: [], columns: ['id', 'name'] }).success).toBe(true);

  expect(displayTable.props.safeParse({ data }).success).toBe(false);

  expect(displayTable.props.safeParse({ data, columns: [{ label: 'Nothing' }] }).success).toBe(false);
});

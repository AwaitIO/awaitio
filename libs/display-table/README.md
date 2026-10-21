# @awaitio/display-table

Table display component for [AwaitIO](https://awaitio.com): `io.display.table()`.

![An All users table with linked names, emails, roles, dates and a … menu at the end of every row](https://docs.awaitio.com/images/io-display-table.png)

## Install

```bash
npm install @awaitio/display-table
```

Needs `awaitio` and `zod` in the app, see the [quickstart](https://docs.awaitio.com/quickstart).

## Setup

Register it under the key you want in `io`, see [Display components](https://docs.awaitio.com/core/display-components):

```ts
import { displayTable } from '@awaitio/display-table';

export const app = new AwaitIO({
  // name, actionsDirectory, theme, secret, users…
  components: { display: { table: displayTable } },
});
```

## Usage

```ts
io.display.table('All users', {
  data: await prisma.user.findMany({ include: { account: true } }),
  columns: [
    { label: 'Name', renderCell: (row) => ({ label: row.name, route: sendWelcomeEmailAction.route({ params: { name: row.name } }) }) },
    { label: 'Email', accessorKey: 'email' },
    { label: 'Account', renderCell: (row) => row.account.name },
    'createdAt',
  ],
  rowMenuItems: (row) => [changeRoleAction.route({ params: { id: row.id } })],
});
```

Props, columns, row menu and how values look are on the [Display Table docs page](https://docs.awaitio.com/io/display-table).

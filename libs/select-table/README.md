# @awaitio/select-table

Rows picked from a table for [AwaitIO](https://awaitio.com): `io.select.table()`.

![A User table with Name, email and Account columns, a filter and pager above it and a radio in front of every row, Mia Novak picked](https://docs.awaitio.com/images/io-select-table.png)

## Install

```bash
npm install @awaitio/select-table
```

Needs `awaitio` and `zod` in the app, see the [quickstart](https://docs.awaitio.com/quickstart).

## Setup

Register it under the key you want in `io`, see [Input components](https://docs.awaitio.com/core/input-components):

```ts
import { selectTable } from '@awaitio/select-table';

export const app = new AwaitIO({
  // name, actionsDirectory, theme, secret, users…
  components: { select: { table: selectTable } },
});
```

## Usage

```ts
const [user] = await io.select.table('User', {
  data: await prisma.user.findMany({ include: { account: true } }),
  columns: [{ label: 'Name', accessorKey: 'name' }, 'email', { label: 'Account', renderCell: (row) => row.account.name }],
});
```

Props, an empty table, optional, returns, built-in validation and custom validation are on the [Select Table docs page](https://docs.awaitio.com/io/select-table).

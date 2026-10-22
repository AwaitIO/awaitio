# @awaitio/layout-basic

The basic page layout for [AwaitIO](https://awaitio.com) – `io.layout.basic()`, a title, a description and the display components below each other.

![The Users page of the demo app: the title Users with its description and two buttons, tiles with totals and a users table](https://docs.awaitio.com/images/page-layout-table.png)

## Install

```bash
npm install @awaitio/layout-basic
```

Needs `awaitio` and `zod` in the app, see the [quickstart](https://docs.awaitio.com/quickstart).

## Setup

Register it under `basic`, see [Layout components](https://docs.awaitio.com/core/layout-components):

```ts
import { layoutBasic } from '@awaitio/layout-basic';

export const app = new AwaitIO({
  // name, actionsDirectory, theme, secret, users, components…
  layouts: { basic: layoutBasic },
});
```

## Usage

```ts
export const usersPage = app.definePage({
  description: 'Everyone who works with the back office.',
  handler: async ({ io }) => {
    return io.layout.basic({
      title: 'Users',
      description: 'Everyone who works with the back office.',
      children: [io.display.table('All users', { data: await prisma.user.findMany(), columns: ['name', 'email'] })],
    });
  },
});
```

Props and menu items are on the [Layout Basic docs page](https://docs.awaitio.com/io/layout-basic).

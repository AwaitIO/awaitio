# @awaitio/display-object

Object for [AwaitIO](https://awaitio.com): `io.display.object()`, keys and values of a record, nested data included.

![An Account heading with a JSON tree: id, name, a nested plan, a list of owners and isTrial false](https://docs.awaitio.com/images/io-display-object.png)

## Install

```bash
npm install @awaitio/display-object
```

Needs `awaitio` and `zod` in the app, see the [quickstart](https://docs.awaitio.com/quickstart).

## Setup

Register it under the key you want in `io`, see [Display components](https://docs.awaitio.com/core/display-components):

```ts
import { displayObject } from '@awaitio/display-object';

export const app = new AwaitIO({
  // name, actionsDirectory, theme, secret, users…
  components: { display: { object: displayObject } },
});
```

## Usage

```ts
const account = await prisma.account.findUniqueOrThrow({ where: { id }, include: { plan: true } });

await io.display.object('Account', { data: account });
```

Props and how it looks are on the [Display Object docs page](https://docs.awaitio.com/io/display-object).

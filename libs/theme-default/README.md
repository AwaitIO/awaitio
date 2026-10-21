# @awaitio/theme-default

The default look of [AwaitIO](https://awaitio.com): every building block of `awaitio/ui` (`Field`, `Label`, `Input`, `Button`, `Table` and the rest), with its styles. Components never style themselves, so the theme restyles every form, table and page at once.

![An AwaitIO action asking for a company name and an owner email](https://docs.awaitio.com/images/intro-form.png)

## Install

```bash
npm install @awaitio/theme-default
```

Needs `awaitio` and `zod` in the app, see the [quickstart](https://docs.awaitio.com/quickstart).

## Setup

`theme` is required and has no default:

```ts
import { defaultTheme } from '@awaitio/theme-default';
import { AwaitIO } from 'awaitio';

export const app = new AwaitIO({
  // name, actionsDirectory, secret, users, components…
  theme: defaultTheme,
});
```

## Change one block

Spread the theme and replace the blocks you want with blocks of another theme package:

```ts
theme: { ...defaultTheme, Label: myTheme.Label },
```

Writing your own blocks is on the [Theme docs page](https://docs.awaitio.com/core/theme).

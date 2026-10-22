# @awaitio/select-single

One choice from a list for [AwaitIO](https://awaitio.com) – `io.select.single()`.

![A New role drop-down open on Admin, Editor and Viewer, with Editor chosen and a × to clear it](https://docs.awaitio.com/images/io-select-single.png)

## Install

```bash
npm install @awaitio/select-single
```

Needs `awaitio` and `zod` in the app, see the [quickstart](https://docs.awaitio.com/quickstart).

## Setup

Register it under the key you want in `io`, see [Input components](https://docs.awaitio.com/core/input-components):

```ts
import { selectSingle } from '@awaitio/select-single';

export const app = new AwaitIO({
  // name, actionsDirectory, theme, secret, users…
  components: { select: { single: selectSingle } },
});
```

## Usage

```ts
const role = await io.select.single('New role', {
  options: [
    { value: 'admin', label: 'Admin' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Viewer' },
  ],
  defaultValue: 'editor',
  clearable: true,
});
// role is { value: 'editor', label: 'Editor' }
```

Props, optional, returns, built-in validation and custom validation are on the [Select Single docs page](https://docs.awaitio.com/io/select-single).

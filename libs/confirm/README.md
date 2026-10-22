# @awaitio/confirm

Confirmation for [AwaitIO](https://awaitio.com) – `io.confirm()`, returns true or false.

![The question Delete this user account? with help text under it and Confirm and Cancel buttons](https://docs.awaitio.com/images/io-confirm.png)

## Install

```bash
npm install @awaitio/confirm
```

Needs `awaitio` and `zod` in the app, see the [quickstart](https://docs.awaitio.com/quickstart).

## Setup

Register it under the key you want in `io`, see [Input components](https://docs.awaitio.com/core/input-components):

```ts
import { confirm } from '@awaitio/confirm';

export const app = new AwaitIO({
  // name, actionsDirectory, theme, secret, users…
  components: { confirm },
});
```

## Usage

```ts
const isConfirmed = await io.confirm('Delete this user account?', {
  helpText: 'All of their data will be deleted immediately.',
});

if (!isConfirmed) {
  return 'Nothing was deleted.';
}
```

Props and returns are on the [Confirm docs page](https://docs.awaitio.com/io/confirm).

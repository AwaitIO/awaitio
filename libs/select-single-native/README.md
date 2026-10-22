# @awaitio/select-single-native

One choice from a list for [AwaitIO](https://awaitio.com) – `io.select.singleNative()`.

![A New role drop-down with Editor chosen](https://docs.awaitio.com/images/io-select-single-native.png)

## Install

```bash
npm install @awaitio/select-single-native
```

Needs `awaitio` and `zod` in the app, see the [quickstart](https://docs.awaitio.com/quickstart).

## Setup

Register it under the key you want in `io`, see [Input components](https://docs.awaitio.com/core/input-components):

```ts
import { selectSingleNative } from '@awaitio/select-single-native';

export const app = new AwaitIO({
  // name, actionsDirectory, theme, secret, users…
  components: { select: { singleNative: selectSingleNative } },
});
```

## Usage

```ts
const role = await io.select.singleNative('New role', {
  options: [
    { value: 'admin', label: 'Admin' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Viewer' },
  ],
  defaultValue: 'editor',
});
// role is { value: 'editor', label: 'Editor' }
```

Props, optional, returns, built-in validation and custom validation are on the [Select Single Native docs page](https://docs.awaitio.com/io/select-single-native).

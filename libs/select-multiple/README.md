# @awaitio/select-multiple

Several choices from a list for [AwaitIO](https://awaitio.com) – `io.select.multiple()`.

![A Tell them by frame with the Add… drop-down on top and Email in a row under it with a × on the right, and help text under the frame](https://docs.awaitio.com/images/io-select-multiple.png)

## Install

```bash
npm install @awaitio/select-multiple
```

Needs `awaitio` and `zod` in the app, see the [quickstart](https://docs.awaitio.com/quickstart).

## Setup

Register it under the key you want in `io`, see [Input components](https://docs.awaitio.com/core/input-components):

```ts
import { selectMultiple } from '@awaitio/select-multiple';

export const app = new AwaitIO({
  // name, actionsDirectory, theme, secret, users…
  components: { select: { multiple: selectMultiple } },
});
```

## Usage

```ts
const channels = await io.select.multiple('Tell them by', {
  options: [
    { value: 'email', label: 'Email' },
    { value: 'slack', label: 'Slack' },
    { value: 'sms', label: 'SMS' },
  ],
  defaultValue: ['email'],
  maxSelections: 2,
  helpText: 'Leave it empty to change the role quietly.',
});
// channels is [{ value: 'email', label: 'Email' }]
```

Props, optional, returns, built-in validation and custom validation are on the [Select Multiple docs page](https://docs.awaitio.com/io/select-multiple).

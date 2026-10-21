# @awaitio/input-boolean

A yes or no field for [AwaitIO](https://awaitio.com): `io.input.boolean()`.

![The label Send a confirmation email above a checked checkbox with the help text to its right](https://docs.awaitio.com/images/io-input-boolean.png)

## Install

```bash
npm install @awaitio/input-boolean
```

Needs `awaitio` and `zod` in the app, see the [quickstart](https://docs.awaitio.com/quickstart).

## Setup

Register it under the key you want in `io`, see [Input components](https://docs.awaitio.com/core/input-components):

```ts
import { inputBoolean } from '@awaitio/input-boolean';

export const app = new AwaitIO({
  // name, actionsDirectory, theme, secret, users…
  components: { input: { boolean: inputBoolean } },
});
```

## Usage

```ts
const sendEmail = await io.input.boolean('Send a confirmation email', {
  defaultValue: true,
  helpText: 'The customer gets a copy of the change',
});
```

Props, returns, built-in validation and custom validation are on the [Input Boolean docs page](https://docs.awaitio.com/io/input-boolean).

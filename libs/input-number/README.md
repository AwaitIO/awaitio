# @awaitio/input-number

Number input for [AwaitIO](https://awaitio.com) – `io.input.number()`.

![A Refund amount field filled with 120, with help text under it](https://docs.awaitio.com/images/io-input-number.png)

## Install

```bash
npm install @awaitio/input-number
```

Needs `awaitio` and `zod` in the app, see the [quickstart](https://docs.awaitio.com/quickstart).

## Setup

Register it under the key you want in `io`, see [Input components](https://docs.awaitio.com/core/input-components):

```ts
import { inputNumber } from '@awaitio/input-number';

export const app = new AwaitIO({
  // name, actionsDirectory, theme, secret, users…
  components: { input: { number: inputNumber } },
});
```

## Usage

```ts
const amount = await io.input.number('Refund amount', {
  min: 0,
  max: 500,
  decimals: 2,
  helpText: 'In euros, up to 500',
});
```

Props, optional, returns, built-in validation and custom validation are on the [Input Number docs page](https://docs.awaitio.com/io/input-number).

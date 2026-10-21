# @awaitio/input-email

Email address input for [AwaitIO](https://awaitio.com): `io.input.email()`.

![An Email field filled with ada@example.com, with help text under it](https://docs.awaitio.com/images/io-input-email.png)

## Install

```bash
npm install @awaitio/input-email
```

Needs `awaitio` and `zod` in the app, see the [quickstart](https://docs.awaitio.com/quickstart).

## Setup

Register it under the key you want in `io`, see [Input components](https://docs.awaitio.com/core/input-components):

```ts
import { inputEmail } from '@awaitio/input-email';

export const app = new AwaitIO({
  // name, actionsDirectory, theme, secret, users…
  components: { input: { email: inputEmail } },
});
```

## Usage

```ts
const ownerEmail = await io.input.email('Owner email', {
  placeholder: 'ada@example.com',
  helpText: 'Gets the invitation',
});
```

Props, optional, returns, built-in validation and custom validation are on the [Input Email docs page](https://docs.awaitio.com/io/input-email).

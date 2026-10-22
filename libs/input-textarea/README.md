# @awaitio/input-textarea

Multi-line text input for [AwaitIO](https://awaitio.com) – `io.input.textarea()`.

![A Why refund this payment? text area with a filled-in reason and help text under it](https://docs.awaitio.com/images/io-input-textarea.png)

## Install

```bash
npm install @awaitio/input-textarea
```

Needs `awaitio` and `zod` in the app, see the [quickstart](https://docs.awaitio.com/quickstart).

## Setup

Register it under the key you want in `io`, see [Input components](https://docs.awaitio.com/core/input-components):

```ts
import { inputTextarea } from '@awaitio/input-textarea';

export const app = new AwaitIO({
  // name, actionsDirectory, theme, secret, users…
  components: { input: { textarea: inputTextarea } },
});
```

## Usage

```ts
const reason = await io.input.textarea('Why refund this payment?', {
  lines: 4,
  minLength: 10,
  helpText: 'Goes to the customer with the refund',
});
```

Props, optional, returns, built-in validation and custom validation are on the [Input Textarea docs page](https://docs.awaitio.com/io/input-textarea).

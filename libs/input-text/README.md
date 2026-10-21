# @awaitio/input-text

Single-line text input for [AwaitIO](https://awaitio.com): `io.input.text()` asks for a string and the action waits for the answer.

![A Search for text field filled with refund, with help text under it](https://docs.awaitio.com/images/io-input-text.png)

## Install

```bash
npm install @awaitio/input-text
```

Needs `awaitio` and `zod` in the app, see the [quickstart](https://docs.awaitio.com/quickstart).

## Setup

Register it under the key you want in `io`:

```ts
import { inputText } from '@awaitio/input-text';
import { AwaitIO } from 'awaitio';

export const app = new AwaitIO({
  // name, actionsDirectory, theme, secret, users…
  components: { input: { text: inputText } },
});
```

## Usage

```ts
const query = await io.input.text('Search for', {
  placeholder: 'refund',
  helpText: 'A user or what they did',
});
```

Props (`placeholder`, `helpText`, `defaultValue`, `minLength`, `maxLength`, `disabled`), `.optional()` and the validation messages are on the [Input Text docs page](https://docs.awaitio.com/io/input-text).

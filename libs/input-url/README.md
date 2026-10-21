# @awaitio/input-url

URL input for [AwaitIO](https://awaitio.com): `io.input.url()`, returns a URL.

![A Website field filled with https://northwind-coffee.example/pricing](https://docs.awaitio.com/images/io-input-url.png)

## Install

```bash
npm install @awaitio/input-url
```

Needs `awaitio` and `zod` in the app, see the [quickstart](https://docs.awaitio.com/quickstart).

## Setup

Register it under the key you want in `io`, see [Input components](https://docs.awaitio.com/core/input-components):

```ts
import { inputUrl } from '@awaitio/input-url';

export const app = new AwaitIO({
  // name, actionsDirectory, theme, secret, users…
  components: { input: { url: inputUrl } },
});
```

## Usage

```ts
const website = await io.input.url('Website', {
  placeholder: 'https://example.com',
});

website.hostname; // 'example.com'
```

Props, optional, returns, built-in validation and custom validation are on the [Input URL docs page](https://docs.awaitio.com/io/input-url).

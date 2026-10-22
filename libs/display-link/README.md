# @awaitio/display-link

Link for [AwaitIO](https://awaitio.com) – `io.display.link()`, to a page in the app or outside it.

![A Login link heading with an app.example.com login URL under it as a blue link](https://docs.awaitio.com/images/io-display-link.png)

## Install

```bash
npm install @awaitio/display-link
```

Needs `awaitio` and `zod` in the app, see the [quickstart](https://docs.awaitio.com/quickstart).

## Setup

Register it under the key you want in `io`, see [Display components](https://docs.awaitio.com/core/display-components):

```ts
import { displayLink } from '@awaitio/display-link';

export const app = new AwaitIO({
  // name, actionsDirectory, theme, secret, users…
  components: { display: { link: displayLink } },
});
```

## Usage

```ts
const token = await createLoginToken(user);

await io.display.link('Login link', { url: `https://app.example.com/login/${token}` });
```

Props are on the [Display Link docs page](https://docs.awaitio.com/io/display-link).

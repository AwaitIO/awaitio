# @awaitio/display-html

HTML for [AwaitIO](https://awaitio.com) – `io.display.html()`, sanitized markup in a page or a step.

![An Email preview heading with a short email in formatted text and a blue Choose a plan link](https://docs.awaitio.com/images/io-display-html.png)

## Install

```bash
npm install @awaitio/display-html
```

Needs `awaitio` and `zod` in the app, see the [quickstart](https://docs.awaitio.com/quickstart).

## Setup

Register it under the key you want in `io`, see [Display components](https://docs.awaitio.com/core/display-components):

```ts
import { displayHtml } from '@awaitio/display-html';

export const app = new AwaitIO({
  // name, actionsDirectory, theme, secret, users…
  components: { display: { html: displayHtml } },
});
```

## Usage

```ts
const email = await renderTrialEndingEmail(account);

await io.display.html('Email preview', { html: email.html });
```

Props and sanitizing are on the [Display HTML docs page](https://docs.awaitio.com/io/display-html).

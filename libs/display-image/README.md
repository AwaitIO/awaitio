# @awaitio/display-image

Image for [AwaitIO](https://awaitio.com): `io.display.image()`, e.g. a chart or a file preview.

![An Uploaded photo heading with a photo of a misty cliff under it, kept to a medium height](https://docs.awaitio.com/images/io-display-image.png)

## Install

```bash
npm install @awaitio/display-image
```

Needs `awaitio` and `zod` in the app, see the [quickstart](https://docs.awaitio.com/quickstart).

## Setup

Register it under the key you want in `io`, see [Display components](https://docs.awaitio.com/core/display-components):

```ts
import { displayImage } from '@awaitio/display-image';

export const app = new AwaitIO({
  // name, actionsDirectory, theme, secret, users…
  components: { display: { image: displayImage } },
});
```

## Usage

```ts
await io.display.image('Uploaded photo', {
  url: await getSignedUrl(upload.fileKey),
  size: 'medium',
});
```

Props are on the [Display Image docs page](https://docs.awaitio.com/io/display-image).

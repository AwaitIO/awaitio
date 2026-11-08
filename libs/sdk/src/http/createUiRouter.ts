import express, { Router, type IRouter } from 'express';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

// `vite build` writes the UI next to the compiled server (dist/ui), so the published package carries it.
const uiDirectory = resolve(__dirname, '../ui');
const indexHtml = resolve(uiDirectory, 'index.html');

export type CreateUiRouterArgs = {
  basePath: string;
  // HTML added before </head>, '' for none.
  head: string;
};

export const createUiRouter = ({ basePath, head }: CreateUiRouterArgs): IRouter => {
  const router = Router();

  router.use(express.static(uiDirectory, { index: false }));

  // Every other GET is a client-side route (/, /runs/:id) and gets the SPA shell. Its <base href> is where the assets
  // (./assets/…) resolve from on any route, and where the UI reads the basePath from.
  router.get('*', (_req, res) => {
    if (!existsSync(indexHtml)) {
      return res.status(500).type('text').send('The UI is not built. Run `pnpm build` in libs/sdk.');
    }

    // Replacer functions, so a `$&` or `$1` in the head is sent as written.
    return res.type('html').send(
      readFileSync(indexHtml, 'utf8')
        .replace('<head>', () => `<head>\n    <base href="${basePath}/" />`)
        .replace('</head>', () => (head ? `  ${head}\n  </head>` : '</head>')),
    );
  });

  return router;
};

import express, { Router, type IRouter } from 'express';
import { existsSync } from 'fs';
import { resolve } from 'path';

// `vite build` writes the UI next to the compiled server (dist/ui), so the published package carries it.
const uiDirectory = resolve(__dirname, '../ui');
const indexHtml = resolve(uiDirectory, 'index.html');

export const createUiRouter = (): IRouter => {
  const router = Router();

  router.use(express.static(uiDirectory, { index: false }));

  // Every other GET is a client-side route (/, /runs/:id) and gets the SPA shell.
  router.get('*', (_req, res) => {
    if (!existsSync(indexHtml)) {
      return res.status(500).type('text').send('The UI is not built. Run `pnpm build` in libs/sdk.');
    }

    return res.sendFile(indexHtml);
  });

  return router;
};

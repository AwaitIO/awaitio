import { Router, type IRouter } from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import type { ComponentRegistry } from '../types/ComponentRegistry';

export type CreateComponentsRouterArgs = {
  registry: ComponentRegistry;
};

// Serves the browser part of every registered component: <folder of its definition>/ui/ui.js, built by `awaitio/vite`.
// The UI injects these on demand, see componentUiRegistry.
export const createComponentsRouter = ({ registry }: CreateComponentsRouterArgs): IRouter => {
  const router = Router();

  router.get('/components/:type/:file(ui.js|ui.css)', (req, res) => {
    const definition = registry.byType.get(req.params.type);

    if (!definition) {
      return res.status(404).type('text').send('Unknown component.');
    }

    res.setHeader('Cache-Control', 'no-cache');
    const path = definition.uiDirectory ? join(definition.uiDirectory, 'ui', req.params.file) : null;

    if (path && existsSync(path)) {
      return res.sendFile(path);
    }

    // Most components use only the SDK's styles; an empty stylesheet lets the UI always link one.
    if (req.params.file === 'ui.css') {
      return res.type('css').send('');
    }

    return res.status(404).type('text').send(`The UI of ${req.params.type} is not built. Run the build of its package.`);
  });

  return router;
};

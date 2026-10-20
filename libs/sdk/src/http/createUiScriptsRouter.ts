import { Router, type IRouter } from 'express';
import { existsSync } from 'fs';
import { join } from 'path';

export type CreateUiScriptsRouterArgs = {
  // The scripts are served at /<kind>/:type/ui.js and ui.css; a theme's type is its position in the list.
  kind: 'components' | 'layouts' | 'themes';
  definitions: Map<string, { uiDirectory: string | null }>;
};

// Serves the browser part of every registered component or layout: <folder of its definition>/ui/ui.js, built by
// `awaitio/vite`. The UI injects these on demand, see ComponentUiRegistry.
export const createUiScriptsRouter = ({ kind, definitions }: CreateUiScriptsRouterArgs): IRouter => {
  const router = Router();

  router.get(`/${kind}/:type/:file(ui.js|ui.css)`, (req, res) => {
    const definition = definitions.get(req.params.type);

    if (!definition) {
      return res
        .status(404)
        .type('text')
        .send(`Unknown ${kind.slice(0, -1)}.`);
    }

    res.setHeader('Cache-Control', 'no-cache');
    const path = definition.uiDirectory ? join(definition.uiDirectory, 'ui', req.params.file) : null;

    if (path && existsSync(path)) {
      return res.sendFile(path);
    }

    // Most packages use only the SDK's styles; an empty stylesheet lets the UI always link one.
    if (req.params.file === 'ui.css') {
      return res.type('css').send('');
    }

    return res.status(404).type('text').send(`The UI of ${req.params.type} is not built. Run the build of its package.`);
  });

  return router;
};

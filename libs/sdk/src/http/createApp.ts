import express, { type Express } from 'express';
import { createActionsRouter } from './createActionsRouter';
import { createAppInfoRouter } from './createAppInfoRouter';
import { createAuthMiddleware } from './createAuthMiddleware';
import { createPagesRouter } from './createPagesRouter';
import { createRunsRouter } from './createRunsRouter';
import { createSessionRouter } from './createSessionRouter';
import { createUiRouter } from './createUiRouter';
import { createUiScriptsRouter } from './createUiScriptsRouter';
import { rejectCrossSiteRequests } from './rejectCrossSiteRequests';
import type { RunManager } from '../classes/RunManager';
import type { Sessions } from '../classes/Sessions';
import type { AwaitIOEnvironment } from '../types/AwaitIOEnvironment';
import type { ComponentRegistry } from '../types/ComponentRegistry';
import type { LayoutRegistry } from '../types/LayoutRegistry';
import type { RegisteredAction } from '../types/RegisteredAction';
import type { RegisteredPage } from '../types/RegisteredPage';

export type CreateAppArgs = {
  name: string;
  environments: AwaitIOEnvironment[];
  sessions: Sessions;
  actions: Map<string, RegisteredAction>;
  pages: Map<string, RegisteredPage>;
  manager: RunManager;
  registry: ComponentRegistry;
  layoutRegistry: LayoutRegistry;
};

export const createApp = ({ name, environments, sessions, actions, pages, manager, registry, layoutRegistry }: CreateAppArgs): Express => {
  return (
    express()
      .disable('x-powered-by')
      .use((_req, res, next) => {
        res.setHeader('Referrer-Policy', 'no-referrer');
        // No page may frame the UI: a framed, logged-in UI could be clickjacked into answering a step.
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('Content-Security-Policy', "frame-ancestors 'none'");
        res.setHeader('X-Content-Type-Options', 'nosniff');
        next();
      })
      .get('/health', (_req, res) => {
        res.json({ status: 'ok' });
      })
      .use(
        '/api',
        (_req, res, next) => {
          res.setHeader('Cache-Control', 'no-store');
          next();
        },
        rejectCrossSiteRequests,
        express.json(),
        createAppInfoRouter({ name, environments, sessions }),
        createSessionRouter({ sessions }),
        createAuthMiddleware({ sessions }),
        createActionsRouter({ actions, pages, manager }),
        createPagesRouter({ pages, registry, layoutRegistry }),
        createRunsRouter({ manager }),
        (_req: express.Request, res: express.Response) => {
          res.status(404).json({ error: 'NOT_FOUND' });
        },
      )
      .use('/components', createAuthMiddleware({ sessions }))
      .use(createUiScriptsRouter({ kind: 'components', definitions: new Map<string, { uiDirectory: string | null }>([...registry.byType, ...registry.displayByType]) }))
      .use('/layouts', createAuthMiddleware({ sessions }))
      .use(createUiScriptsRouter({ kind: 'layouts', definitions: layoutRegistry.byType }))
      // The page and its assets hold no data; without a session the UI shows the login form.
      .use(createUiRouter())
  );
};

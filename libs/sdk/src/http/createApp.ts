import express, { type Express } from 'express';
import { createActionsRouter } from './createActionsRouter';
import { createAuthMiddleware } from './createAuthMiddleware';
import { createComponentsRouter } from './createComponentsRouter';
import { createRunsRouter } from './createRunsRouter';
import { createUiRouter } from './createUiRouter';
import { rejectCrossSiteRequests } from './rejectCrossSiteRequests';
import type { RunManager } from '../classes/RunManager';
import type { ComponentRegistry } from '../types/ComponentRegistry';
import type { RegisteredAction } from '../types/RegisteredAction';

export type CreateAppArgs = {
  token: string;
  actions: Map<string, RegisteredAction>;
  manager: RunManager;
  registry: ComponentRegistry;
};

export const createApp = ({ token, actions, manager, registry }: CreateAppArgs): Express => {
  return express()
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
    .use(createAuthMiddleware({ token }))
    .use(
      '/api',
      (_req, res, next) => {
        res.setHeader('Cache-Control', 'no-store');
        next();
      },
      rejectCrossSiteRequests,
      express.json(),
      createActionsRouter({ actions, manager }),
      createRunsRouter({ manager }),
      (_req: express.Request, res: express.Response) => {
        res.status(404).json({ error: 'NOT_FOUND' });
      },
    )
    .use(createComponentsRouter({ registry }))
    .use(createUiRouter());
};

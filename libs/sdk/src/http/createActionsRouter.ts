import { Router, type IRouter } from 'express';
import type { RunManager } from '../classes/RunManager';
import { startRunRequestSchema } from '../shared/schemas/startRunRequestSchema';
import type { ActionList } from '../shared/types/ActionList';
import type { RegisteredAction } from '../types/RegisteredAction';
import type { RegisteredPage } from '../types/RegisteredPage';
import { formatZodError } from '../utils/formatZodError';
import { getSessionUser } from '../utils/getSessionUser';

export type CreateActionsRouterArgs = {
  actions: Map<string, RegisteredAction>;
  pages: Map<string, RegisteredPage>;
  manager: RunManager;
};

export const createActionsRouter = ({ actions, pages, manager }: CreateActionsRouterArgs): IRouter => {
  const router = Router();

  router.get('/actions', (_req, res) => {
    const body: ActionList = {
      actions: [...actions.values()].map(({ slug, name, description }) => {
        return { slug, name, description };
      }),
      pages: [...pages.values()].map(({ slug, name, description }) => {
        return { slug, name, description };
      }),
    };

    res.json(body);
  });

  router.post('/actions/:slug/runs', (req, res) => {
    const action = actions.get(req.params.slug);

    if (!action) {
      return res.status(404).json({ error: 'ACTION_NOT_FOUND' });
    }

    const body = startRunRequestSchema.safeParse(req.body);

    if (!body.success) {
      return res.status(400).json({ error: 'BAD_REQUEST', message: body.error.message });
    }

    const parsed = action.params ? action.params.safeParse(body.data.params) : { success: true as const, data: body.data.params };

    if (!parsed.success) {
      return res.status(400).json({ error: 'INVALID_PARAMS', message: `The link does not fit this action. ${formatZodError({ error: parsed.error })}` });
    }

    return res.status(201).json({ runId: manager.start({ action, user: getSessionUser({ res }), params: body.data.params, ctxParams: parsed.data }).id });
  });

  return router;
};

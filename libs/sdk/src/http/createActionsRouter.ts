import { Router, type IRouter } from 'express';
import type { RunManager } from '../classes/RunManager';
import type { ActionList } from '../shared/types/ActionList';
import type { RegisteredAction } from '../types/RegisteredAction';

export type CreateActionsRouterArgs = {
  actions: Map<string, RegisteredAction>;
  manager: RunManager;
};

export const createActionsRouter = ({ actions, manager }: CreateActionsRouterArgs): IRouter => {
  const router = Router();

  router.get('/actions', (_req, res) => {
    const body: ActionList = {
      actions: [...actions.values()].map(({ slug, name, description }) => {
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

    return res.status(201).json({ runId: manager.start(action).id });
  });

  return router;
};

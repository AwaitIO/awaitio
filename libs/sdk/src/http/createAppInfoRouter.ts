import { Router, type IRouter } from 'express';
import type { Sessions } from '../classes/Sessions';
import type { AppInfo } from '../shared/types/AppInfo';
import type { AwaitIOEnvironment } from '../types/AwaitIOEnvironment';
import { readSessionUser } from '../utils/readSessionUser';
import { requestHost } from '../utils/requestHost';

export type CreateAppInfoRouterArgs = {
  name: string;
  environments: AwaitIOEnvironment[];
  sessions: Sessions;
};

// Open without a session: the login page shows which project and environment it logs into. The current environment
// is the one whose URL has the host of the request.
export const createAppInfoRouter = ({ name, environments, sessions }: CreateAppInfoRouterArgs): IRouter => {
  const router = Router();

  router.get('/app', (req, res) => {
    const host = requestHost({ req });
    const links = environments.map(({ title, color, url }) => {
      return { title, color, url, isCurrent: new URL(url).host === host };
    });
    const current = links.find((link) => {
      return link.isCurrent;
    });
    const body: AppInfo = {
      name,
      environment: current ? { title: current.title, color: current.color } : null,
      environments: readSessionUser({ req, sessions }) ? links : [],
    };

    res.json(body);
  });

  return router;
};

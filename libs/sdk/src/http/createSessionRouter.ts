import { Router, type IRouter } from 'express';
import { match } from 'ts-pattern';
import type { Sessions } from '../classes/Sessions';
import { constants } from '../constants';
import { loginRequestSchema } from '../shared/schemas/loginRequestSchema';
import { readSessionUser } from '../utils/readSessionUser';
import { sessionCookieOptions } from '../utils/sessionCookieOptions';

export type CreateSessionRouterArgs = {
  sessions: Sessions;
  basePath: string;
};

// The only API routes open without a session. They sit behind the cross-site check like the rest of /api, so
// another site cannot log the browser into its own account either.
export const createSessionRouter = ({ sessions, basePath }: CreateSessionRouterArgs): IRouter => {
  const router = Router();

  router.get('/session', (req, res) => {
    const user = readSessionUser({ req, sessions });

    return user ? res.json(user) : res.status(401).json({ error: 'UNAUTHORIZED' });
  });

  router.post('/login', (req, res, next) => {
    const body = loginRequestSchema.safeParse(req.body);

    if (!body.success) {
      return res.status(400).json({ error: 'BAD_REQUEST', message: body.error.message });
    }

    return sessions
      .login(body.data)
      .then((result) => {
        return match(result)
          .with({ status: 'OK' }, ({ user, cookie }) => {
            res.cookie(constants.SESSION_COOKIE_NAME, cookie, sessionCookieOptions({ req, basePath }));

            return res.json(user);
          })
          .with({ status: 'INVALID_CREDENTIALS' }, () => {
            return res.status(401).json({ error: 'INVALID_CREDENTIALS', message: 'Wrong email or password.' });
          })
          .with({ status: 'LOCKED' }, () => {
            return res.status(429).json({ error: 'TOO_MANY_ATTEMPTS', message: 'Too many failed attempts. Try again in a few minutes.' });
          })
          .exhaustive();
      })
      .catch(next);
  });

  router.post('/logout', (req, res) => {
    res.clearCookie(constants.SESSION_COOKIE_NAME, { ...sessionCookieOptions({ req, basePath }), maxAge: undefined });

    return res.status(204).end();
  });

  return router;
};

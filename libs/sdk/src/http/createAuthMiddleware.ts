import type { Sessions } from '../classes/Sessions';
import { readSessionUser } from '../utils/readSessionUser';
import type { RequestHandler } from 'express';

export type CreateAuthMiddlewareArgs = {
  sessions: Sessions;
};

// Lets through only requests with a valid session cookie and puts their user on res.locals.user.
export const createAuthMiddleware = ({ sessions }: CreateAuthMiddlewareArgs): RequestHandler => {
  return (req, res, next) => {
    const user = readSessionUser({ req, sessions });

    if (!user) {
      return res.status(401).json({ error: 'UNAUTHORIZED' });
    }

    res.locals.user = user;

    return next();
  };
};
